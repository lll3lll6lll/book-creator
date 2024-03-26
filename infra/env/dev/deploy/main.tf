variable "root_dir" {
  type = string
  default = "/home/user/my_projects/book-creator"
}


locals {
  site_name = "mermesa"
}

module "app_deploy" {
  source = "../../../app/deploy"
  artifacts_dir = "infra/temp"
  env = "dev"
  site_name = local.site_name
  s3_bucket_name_client_build = {
    bucket = "${local.site_name}-build-dev"
    key = "client-build"
  }
  s3_bucket_name_client_deploy = {
    bucket = "${local.site_name}-deploy-dev"
    key = ""
  }
  aws_tags   = { Name: "mermesa" }
  root_dir   = var.root_dir
}
