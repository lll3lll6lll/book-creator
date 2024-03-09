module "client-deploy" {
  source = "../../../client_2/infra/deploy"
  artifacts_dir = var.artifacts_dir
  aws_tags = var.aws_tags
  env = var.env
  s3_bucket_name_client_build = var.s3_bucket_name_client_build
  s3_bucket_name_client_deploy = var.s3_bucket_name_client_deploy
}
