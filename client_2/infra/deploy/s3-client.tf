
module "bucket_client_deploy" {
  source = "../../../infra/modules/s3/website_bucket"
  s3_bucket_name = var.s3_bucket_name_client_deploy.bucket
  aws_tags = {}
}


data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = [
      data.aws_s3_bucket.client-deploy.arn,
      "${data.aws_s3_bucket.client-deploy.arn}/*",
    ]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.cf.iam_arn]
    }
  }
}

# Need for avoid `Error putting S3 policy: AccessDenied: Access Denied`
resource "time_sleep" "wait_2_seconds" {
  depends_on      = [module.bucket_client_deploy.bucket_domain_name]
  create_duration = "2s"
}

resource "aws_s3_bucket_policy" "example" {
  bucket = data.aws_s3_bucket.client-deploy.bucket
  policy = data.aws_iam_policy_document.s3_policy.json
  depends_on = [time_sleep.wait_2_seconds]
}



