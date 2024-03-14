

variable "root_dir" {
  type = string
}

module "app_build" {
  source = "../../..//app/build"
  artifacts_dir = "infra/temp"
  aws_tags = {}
  namespace = "mermesa"
  s3_bucket_name_client_build = {
    bucket = "mermesa-build-dev"
    key    = "client-build"
  }
  root_dir = var.root_dir
}
