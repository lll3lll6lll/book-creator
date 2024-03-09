

module "app_client_build" {
  source = "../../../client_2/infra/build"
  artifacts_dir   = var.artifacts_dir
  root_dir        = var.root_dir
  s3_bucket       = var.s3_bucket_name_client_build
  aws_tags = {}
}
