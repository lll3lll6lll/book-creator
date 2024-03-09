module "client_build_bucket" {
  source = "../../../infra/modules/s3/versioned_bucket"
  s3_bucket_name            = var.s3_bucket.bucket
  newer_noncurrent_versions = 3
  aws_tags                  = var.aws_tags
}
