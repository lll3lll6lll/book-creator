module "server_bucket" {
  source = "../../../infra/modules/s3/versioned_bucket"
  s3_bucket_name            = local.server_bucket_name
  aws_tags                  = var.aws_tags
  newer_noncurrent_versions = 3
}

module "server_node_modules_bucket" {
  source = "../../../infra/modules/s3/versioned_bucket"
  s3_bucket_name            = local.node_modules_bucket_name
  aws_tags                  = var.aws_tags
  newer_noncurrent_versions = 3
}


