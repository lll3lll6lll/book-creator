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
  env = "dev"
  create_public_subnets = true
  create_private_subnets = true
  create_database_subnets = false
}



