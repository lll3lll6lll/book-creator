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

#============RESOURCES==============================

resource "aws_s3_bucket" "this" {
  bucket = var.s3_bucket_name
  force_destroy = true
}
