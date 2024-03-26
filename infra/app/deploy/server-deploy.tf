module "server-deploy" {
  source = "../../../server/infra/deploy"
  artifacts_dir = var.artifacts_dir
  aws_tags = var.aws_tags
  env = var.env
  name = var.site_name
  root_dir = var.root_dir
}
