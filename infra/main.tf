provider "aws" {
  region     = "eu-central-1"
}

terraform {
  backend "s3" {
#    encrypt        = true
    bucket = "terraform-states-2024" // Bucket where to SAVE Terraform State
    key    = "dev/terraform.tfstate" // Object name in the bucket to SAVE Terraform State
    region = "eu-central-1"          // Region where bycket created
  }
}

locals {
  name = "coconut"
  env = "dev"
  artifacts_dir = "temp"
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
  create_database_subnets = false
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

locals {
  src= "../server"
  src_files =  flatten([
    fileset("/", "${local.src}/src/**/*.ts"),
    [
      "${local.src}/package.json",
      "${local.src}/package-lock.json"
    ]
  ])
}

resource "terraform_data" "code_build" {
  triggers_replace = {
    force = "1",
    src_length = length(local.src_files)
    src_hash = sha256(join("", [for f in local.src_files : file("/${f}")]))
  }

  provisioner "local-exec" {
    interpreter = ["PowerShell", "-Command"]
    command = <<-EOT

    cd ../server
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
    module.lambda_modules_layer.arn,
    terraform_data.code_build
  ]
}

module "api-gtw" {
  source = "./modules/apiGateway"
  name = "${local.name}-api-gtw"
  lambda_invoke_arn = module.lambda.invoke_arn
}



#resource "aws_cloudwatch_log_group" "lambda" {
#  name = "/aws/lambda/${module.lambda.function_name}"
#  retention_in_days = 30
#  tags = {
#    Environment = local.env
#    Application = "${local.name}-lambda"
#  }
#}



