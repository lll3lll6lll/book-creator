module "app_server_build" {
  source = "../../../server/infra/build"
  artifacts_dir = var.artifacts_dir
  aws_tags = {}
  root_dir = var.root_dir
  s3_bucket_name = var.s3_bucket_name_server_build.bucket
}

