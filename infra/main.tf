terraform {
  backend "s3" {
    #    encrypt        = true
    bucket = "terraform-states-2024" // Bucket where to SAVE Terraform State
    key    = "dev/terraform.tfstate" // Object name in the bucket to SAVE Terraform State
    region = "eu-central-1"          // Region where bycket created
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}


provider "aws" {
  region = "eu-central-1"
  default_tags {
    tags = {
      hashicorp-learn = "module-use"
    }
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

locals {
  name               = "orange"
  env                = "dev"
  artifacts_dir      = "temp"
  availability_zones = ["eu-central-1a", "eu-central-1b"   ]
  src                = "../server"
  src_files = flatten([
    fileset("/", "${local.src}/src/**/*.ts"),
    [
      "${local.src}/package.json",
      "${local.src}/package-lock.json"
    ]
  ])
}

module "vpc" {
  source                  = "./modules/network/vpc"
  name                    = local.name
  env                     = local.env
  create_public_subnets   = true
  create_private_subnets  = true
  create_database_subnets = true
  availability_zones      = local.availability_zones
}

module "lambda_role" {
  source                     = "./modules/iam/role"
  name                       = "ServiceRoleForLambda_${local.name}"
  path_to_assume_role_policy = "./policies/lambda-trust-policy.json"
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AWSLambda_FullAccess",
    "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole",
    "arn:aws:iam::aws:policy/AmazonRDSFullAccess"
  ]
}

#module "pack_node_modules" {
#  source               = "./modules/builders/nodejs_zip"
#  name                 = "${local.name}_node_modules"
#  force                = "8"
#  artifacts_dir        = local.artifacts_dir
#  path_to_package_json = "../server"
#}

#module "lambda_modules_layer" {
#  source           = "./modules/lambda/layer"
#  filename         = module.pack_node_modules.output_path
#  name             = "${local.name}_node_modules"
#  runtime          = "nodejs20.x"
#  source_code_hash = module.pack_node_modules.output_base64sha256
#  depends_on       = [module.pack_node_modules]
#
#}

#resource "terraform_data" "code_build" {
#  triggers_replace = {
#    force      = "4",
#    src_length = length(local.src_files)
#    src_hash   = sha256(join("", [for f in local.src_files : file("./${f}")]))
#  }
#
#  provisioner "local-exec" {
#    command = <<-EOT
#
#    cd "${local.src}"
#    npm run build
#
#    EOT
#  }
#}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "../server/dist"
  output_path = "${local.artifacts_dir}/${local.name}_lambda.zip"
}

module "lambda" {
  source = "./modules/lambda/function"

  function_name = "${local.name}_lambda"
  description   = "My test create_book_lambda lambda function"
  handler       = "lambda.handler"
  runtime       = "nodejs20.x"
  aim_role_arn  = module.lambda_role.arn
#  layers_arn    = [module.lambda_modules_layer.arn]
  filename      = data.archive_file.lambda_zip.output_path

  source_dir    = "../server/dist"
  artifacts_dir = local.artifacts_dir
  force         = "4"
  timeout       = 60

  vpc_subnet_ids  = module.vpc.public_subnets
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment_variables = {
    NODE_ENV = local.env

    #    DB_QUERY_LOGGING=true
    DATABASE_SCHEMA    = "boo_creator"
    DATABASE_NAME      = module.rds_postgres.rds_database_name
    DATABASE_HOST      = module.rds_postgres.rds_hostname
    DATABASE_USERNAME  = module.rds_postgres.rds_username
    DATABASE_PASSWORD  = module.rds_postgres.rds_password
    DATABASE_PORT      = module.rds_postgres.rds_port
    DATABASE_SSL       = true
    DATABASE_POOL_SIZE = 2

    JWT_ACCESS_SECRET   = "secret-super-secret-token-access"
    JWT_ACCESS_EXPIRED  = "40h"
    JWT_REFRESH_SECRET  = "secret-super-secret-token-refresh"
    JWT_REFRESH_EXPIRED = "60d"
  }

  depends_on = [
    module.vpc,
#    module.lambda_modules_layer.arn,
#    terraform_data.code_build,
    module.rds_postgres,
    data.archive_file.lambda_zip
  ]
}

module "lambda_db_migrations" {
  source = "./modules/lambda/function"

  function_name = "${local.name}_lambda_db_migration"
  description   = "My test create_book_lambda lambda migrations"
  handler       = "lambda-migrations.handler"
  runtime       = "nodejs20.x"
  aim_role_arn  = module.lambda_role.arn
#  layers_arn    = [module.lambda_modules_layer.arn]
  filename      = data.archive_file.lambda_zip.output_path

  source_dir    = "../server/dist"
  artifacts_dir = local.artifacts_dir
  force         = "3"
  timeout       = 60

  vpc_subnet_ids  = module.vpc.public_subnets
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment_variables = {
    NODE_ENV = local.env
    #    DB_QUERY_LOGGING=true
    DATABASE_SCHEMA    = "boo_creator"
    DATABASE_NAME      = module.rds_postgres.rds_database_name
    DATABASE_HOST      = module.rds_postgres.rds_hostname
    DATABASE_USERNAME  = module.rds_postgres.rds_username
    DATABASE_PASSWORD  = module.rds_postgres.rds_password
    DATABASE_PORT      = module.rds_postgres.rds_port
    DATABASE_SSL       = true
    DATABASE_POOL_SIZE = 2
  }

  depends_on = [
    module.vpc,
#    module.lambda_modules_layer.arn,
#    terraform_data.code_build,
    module.rds_postgres,
    data.archive_file.lambda_zip
  ]
}

module "api-gtw" {
  source            = "./modules/apiGateway"
  name              = "${local.name}-api-gtw"
  stage_name        = local.env
  lambda_invoke_arn = module.lambda.invoke_arn
  depends_on = [
    module.lambda
  ]
}


resource "random_password" "master_db" {
  length  = 20
  special = false
}

module "rds_postgres" {
  source = "./modules/rds/postgresRds"
  name = local.name
  env = local.env
  subnets = module.vpc.database_subnets
  vpc_id = module.vpc.vpc_id
}


locals {
  site_name =  "mermesa"
}

module "app_build" {
  source = "./app/build"
  artifacts_dir = "temp"
  aws_tags = {}
  namespace = "mermesa"
  s3_bucket_name_client_build = {
    bucket = "${local.site_name}-build-dev"
    key    = "client-build"
  }
  root_dir = "/home/user/my_projects/book-creator"
  s3_bucket_name_server_build = {}
}

module "app_deploy" {
  source = "./app/deploy"
  artifacts_dir = "temp/client-deploy"
  env = "dev"
  s3_bucket_name_client_build = {
    bucket = "${local.site_name}-build-dev"
    key = "client-build"
  }
  s3_bucket_name_client_deploy = {
    bucket = "${local.site_name}-deploy-dev"
    key = ""
  }

  depends_on = [module.app_build]
  aws_tags   = { Name: "mermesa" }
  root_dir   = ""
}




