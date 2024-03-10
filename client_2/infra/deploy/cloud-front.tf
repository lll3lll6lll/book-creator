
locals {
  origin_id = var.s3_bucket_name_client_deploy.bucket
}

resource "aws_cloudfront_origin_access_identity" "cf" {
  comment = "${local.origin_id}-distribution"
}

#resource "aws_cloudfront_origin_access_control" "oac" {
#  name        = "my-oac"
#  description = "OAC for S3 origin"
#  origin_access_control_origin_type = "s3"
#  signing_behavior                  = "always"
#  signing_protocol                  = "sigv4"
#}


resource "aws_cloudfront_distribution" "ui" {
  origin {
    domain_name = data.aws_s3_bucket.client-deploy.bucket_regional_domain_name
    origin_id   = local.origin_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cf.cloudfront_access_identity_path
#      origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    }
  }

#  aliases                 = [var.host.domain_frontend]
  enabled                 = true
  comment                 = "Managed by Terraform"
  default_root_object     = "index.html"
  is_ipv6_enabled         = true
  tags                    = merge(var.aws_tags, tomap({"Component"="AWS_CLOUDFRONT"}))


  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.origin_id
    min_ttl                = 0
    default_ttl            = 60
    max_ttl                = 300

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

#  viewer_certificate {
#    acm_certificate_arn = aws_acm_certificate.cert.arn
#    ssl_support_method  = "sni-only"
#    minimum_protocol_version = "TLSv1.2_2021"
#  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
  }

  price_class  = "PriceClass_100"
}


#resource "aws_acm_certificate" "cert" {
#  domain_name       = "mermesa.com"
#  validation_method = "DNS"
#}
