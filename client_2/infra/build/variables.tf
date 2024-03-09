variable "artifacts_dir" {
  type = string
}

variable "root_dir" {
  type = string
}

variable "s3_bucket" {
  type = object({
    bucket  = string
    key     = string
  })
}

variable "aws_tags" {
  type = map(string)
}
