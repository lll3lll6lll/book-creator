terraform {
  backend "s3" {
    #    encrypt        = true
    bucket = "terraform-states-2024" // Bucket where to SAVE Terraform State
    key    = "dev/terraform.tfstate" // Object name in the bucket to SAVE Terraform State
    region = "eu-central-1"          // Region where bucket created
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}


locals {
  site_name = "mermesa"
}

variable "root_dir" {
  type = string
}

module "app_deploy" {
  source = "../../../app/deploy"
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
  aws_tags   = { Name: "mermesa" }
  root_dir   = var.root_dir
}
