terraform {
  backend "s3" {
    #    encrypt        = true
    bucket = "terraform-states-2024" // Bucket where to SAVE Terraform State
    key    = "dev/terraform_build.tfstate" // Object name in the bucket to SAVE Terraform State
    region = "eu-central-1"          // Region where bucket created
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
