#============VARIABLES==============================

variable "s3_bucket_name" {
  type = string
}

variable "aws_tags" {
  type = map(string)
}

#============OUTPUTS==============================

output "bucket" {
  value = aws_s3_bucket.this.bucket
}

output "id" {
  value = aws_s3_bucket.this.id
}

output "bucket_domain_name" {
  value = aws_s3_bucket.this.bucket_domain_name
}


#============RESOURCES==============================


resource "aws_s3_bucket" "this" {
  bucket = var.s3_bucket_name
  force_destroy = true
}

#resource "aws_s3_bucket_acl" "s3_acl" {
#  bucket = var.s3_bucket_name
#  acl    = "public-read"
#}

resource "aws_s3_bucket_website_configuration" "bucket_website" {
  bucket = aws_s3_bucket.this.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

#resource "aws_s3_bucket_public_access_block" "public_access_block" {
#  bucket = aws_s3_bucket.this.id
#  block_public_acls       = false
#  block_public_policy     = false
#  ignore_public_acls      = false
#  restrict_public_buckets = false
#}

