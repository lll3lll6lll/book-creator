variable "artifacts_dir" {
  type = string
}

variable "env" {
  type = string
}

variable "root_dir" {
  type = string
}

variable "s3_bucket_name_client_build" {
  type = object({
    bucket      = string
    key         = string
  })
}


variable "s3_bucket_name_client_deploy" {
  type = object({
    bucket      = string
    key         = string
  })
}

variable "aws_tags" {
  type = map(string)
}

variable "site_name" {
  type = string
}
