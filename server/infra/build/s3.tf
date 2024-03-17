module "server_build_bucket" {
  source = "../../../infra/modules/s3/bucket"
  s3_bucket_name            = var.s3_bucket_name
  aws_tags                  = var.aws_tags
}

data "aws_s3_bucket" "server_data" {
  bucket = var.s3_bucket_name
  depends_on = [module.server_build_bucket]
}
