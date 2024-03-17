#module "lambda" {
#  source = "../../../infra/modules/lambda/function"
#
#  function_name = "${var.name}_lambda"
#  description   = "lambda managed with terraform"
#  handler       = "lambda.handler"
#  runtime       = "nodejs20.x"
#  aim_role_arn  = module.lambda_role.arn
#  layers_arn    = [module.lambda_modules_layer.arn]
#  filename      = data.archive_file.lambda_zip.output_path
#
#  source_dir    = "../server/dist"
#  artifacts_dir = local.artifacts_dir
#  force         = "4"
#  timeout       = 60
#
#  vpc_subnet_ids  = module.vpc.public_subnets
#  vpc_security_group_ids = [module.vpc.default_security_group_id]
#  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
#
#  environment_variables = {
#    NODE_ENV           = var.env
#    DATABASE_SCHEMA    = "boo_creator"
#    DATABASE_NAME      = module.rds_postgres.rds_database_name
#    DATABASE_HOST      = module.rds_postgres.rds_hostname
#    DATABASE_USERNAME  = module.rds_postgres.rds_username
#    DATABASE_PASSWORD  = module.rds_postgres.rds_password
#    DATABASE_PORT      = module.rds_postgres.rds_port
#    DATABASE_SSL       = true
#    DATABASE_POOL_SIZE = 2
#
#    JWT_ACCESS_SECRET   = "secret-super-secret-token-access"
#    JWT_ACCESS_EXPIRED  = "40h"
#    JWT_REFRESH_SECRET  = "secret-super-secret-token-refresh"
#    JWT_REFRESH_EXPIRED = "60d"
#  }
#
#  depends_on = [
#    module.vpc,
#    module.lambda_modules_layer.arn,
#    module.rds_postgres,
#    data.archive_file.lambda_zip
#  ]
#}
