variable "namespace" {
  type = string
}

variable "root_dir" {
  type = string
}

variable "artifacts_dir" {
  type = string
}

variable "s3_bucket_name_client_build" {
  type = object({
    bucket  = string
    key     = string
  })
}

variable "s3_bucket_name_server_build" {
  type = object({
    bucket  = string
  })
}

variable "aws_tags" {
  type = map(string)
}

