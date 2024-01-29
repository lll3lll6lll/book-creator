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
  region     = "eu-central-1"
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
  name = "orange"
  env = "dev"
  artifacts_dir = "temp"
  availability_zones = [data.aws_availability_zones.available.names[0], data.aws_availability_zones.available.names[1]]
  src= "../server"
  src_files =  flatten([
    fileset("/", "${local.src}/src/**/*.ts"),
    [
      "${local.src}/package.json",
      "${local.src}/package-lock.json"
    ]
  ])
}

#module "storage" {
#  source = "./modules/aws_s3_storage"
#  bucket_name = "simple-test-llllllllll---3333"
#  files_path = "test_app"
#  acl = "public-read"
#}

module vpc {
  source = "./modules/network/vpc"
  name = local.name
  env = local.env
  create_public_subnets = true
  create_private_subnets = true
  create_database_subnets = true
  availability_zones = local.availability_zones
}

module lambda_role {
  source = "./modules/iam/role"
  name   = "ServiceRoleForLambda_${local.name}"
  path_to_assume_role_policy = "./policies/lambda-trust-policy.json"
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AWSLambda_FullAccess",
    "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
  ]
}

module "pack_node_modules"   {
  source = "./modules/builders/nodejs_zip"
  name = "${local.name}_node_modules"
  force = "8"
  artifacts_dir = local.artifacts_dir
  path_to_package_json = "../server"
}

module "lambda_modules_layer" {
  source = "./modules/lambda/layer"
  filename = module.pack_node_modules.output_path
  name = "${local.name}_node_modules"
  runtime = "nodejs20.x"
  source_code_hash = module.pack_node_modules.output_base64sha256
  depends_on = [module.pack_node_modules]
}

resource "terraform_data" "code_build" {
  triggers_replace = {
    force = "2",
    src_length = length(local.src_files)
    src_hash = sha256(join("", [for f in local.src_files : file("./${f}")]))
  }

  provisioner "local-exec" {
    command = <<-EOT

    cd "${local.src}"
    npm run build

    EOT
  }
}

module "lambda" {
  source = "./modules/lambda/function"

  function_name = "${local.name}_lambda"
  description   = "My test create_book_lambda lambda function"
  handler       = "lambda.handler"
  runtime       = "nodejs20.x"
  aim_role_arn  = module.lambda_role.arn
  layers_arn = [ module.lambda_modules_layer.arn ]

  source_dir   = "../server/dist"
  artifacts_dir = local.artifacts_dir

  vpc_subnet_ids  = module.vpc.public_subnets
  vpc_security_group_ids = [module.vpc.default_security_group_id]

  depends_on = [
    module.vpc,
    module.lambda_modules_layer.arn,
    terraform_data.code_build
  ]
}

module "api-gtw" {
  source = "./modules/apiGateway"
  name = "${local.name}-api-gtw"
  stage_name = local.env
  lambda_invoke_arn = module.lambda.invoke_arn
}


resource "random_password" "master_db" {
  length  = 20
  special = false
}

module "aurora_serverless" {
  source                  = "./modules/rds"
  name                    = local.name
  master_username         = "root"
  backup_retention_period = 7
  master_password         = random_password.master_db.result
  subnets                 = module.vpc.database_subnets
  availability_zones      = local.availability_zones

  depends_on              = [module.vpc]
}





