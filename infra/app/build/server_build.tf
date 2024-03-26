module "app_server_build" {
  source = "../../../server/infra/build"
  artifacts_dir = var.artifacts_dir
  aws_tags = {}
  root_dir = var.root_dir
  env = var.env
  name = var.site_name
}

