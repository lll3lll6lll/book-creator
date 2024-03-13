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

module "app_build" {
  source = "../../..//app/build"
  artifacts_dir = "infra/temp"
  aws_tags = {}
  namespace = "mermesa"
  s3_bucket_name_client_build = {
    bucket = "mermesa-build-dev"
    key    = "client-build"
  }
  root_dir = ""
}
