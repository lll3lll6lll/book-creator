#============VARIABLES==============================

variable "s3_bucket_name" {
  type = string
}

variable "newer_noncurrent_versions" {
  type = number
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

#============RESOURCES==============================

resource "aws_s3_bucket" "this" {
  bucket = var.s3_bucket_name
  tags = var.aws_tags
}

resource "aws_s3_bucket_versioning" "src_bucket" {
  bucket = aws_s3_bucket.this.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "src_bucket" {
  bucket = aws_s3_bucket.this.id
  rule {
    id     = "Versions limit"
    status = "Enabled"
    filter {}
    noncurrent_version_expiration {
      noncurrent_days = 1
      newer_noncurrent_versions = 3
    }
  }
}
