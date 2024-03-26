module "api-gtw-lambda-server" {
  source            = "../../../infra/modules/apiGateway"
  name              = "${var.name}-api-gtw"
  stage_name        = var.env
  lambda_invoke_arn = module.lambda_server.invoke_arn
  depends_on = [  module.lambda_server ]
}

module "lambda_server" {
  source = "../../../infra/modules/lambda/function"

  function_name = "${var.name}_db_migration"
  description   = "lambda managed with terraform"
  handler       = "lambda-migrations.handler"
  runtime       = "nodejs20.x"
  aim_role_arn  =  aws_iam_role.server_lambda_role.arn
  layers_arn    = [data.aws_lambda_layer_version.node_modules_layer.arn]

  s3_bucket     = var.s3_bucket_name
  s3_key        = local.server_name_zip

  timeout       = 60

#  vpc_subnet_ids  = module.vpc.public_subnets
#  vpc_security_group_ids = [module.vpc.default_security_group_id]
  source_code_hash = local.server_name_hash

  environment_variables = {
    NODE_ENV           = var.env
    DATABASE_SCHEMA    = "boo_creator"
#    DATABASE_NAME      = module.rds_postgres.rds_database_name
#    DATABASE_HOST      = module.rds_postgres.rds_hostname
#    DATABASE_USERNAME  = module.rds_postgres.rds_username
#    DATABASE_PASSWORD  = module.rds_postgres.rds_password
#    DATABASE_PORT      = module.rds_postgres.rds_port
    DATABASE_SSL       = true
    DATABASE_POOL_SIZE = 2

    JWT_ACCESS_SECRET   = "secret-super-secret-token-access"
    JWT_ACCESS_EXPIRED  = "40h"
    JWT_REFRESH_SECRET  = "secret-super-secret-token-refresh"
    JWT_REFRESH_EXPIRED = "60d"
  }

}
