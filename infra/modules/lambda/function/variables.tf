variable "function_name" {
  description = "A unique name for your Lambda Function"
  type        = string
}

variable "description" {
  description = "Description of your Lambda Function (or Layer)"
  type        = string
  default     = ""
}

variable "environment_variables" {
  description = "A map that defines environment variables for the Lambda Function."
  type        = map(string)
  default     = {}
}

variable "vpc_security_group_ids" {
  description = "List of security group ids when Lambda Function should run in the VPC."
  type        = list(string)
  default     = []
}


variable "vpc_subnet_ids" {
  description = "List of subnet ids when Lambda Function should run in the VPC. Usually private or intra subnets."
  type        = list(string)
  default     = []
}

variable "tags" {
  description = "A map of tags to assign to resources."
  type        = map(string)
  default     = {}
}

variable "handler" {
  description = "Lambda Function entrypoint in your code"
  type        = string
}

variable "runtime" {
  description = "Lambda Function runtime"
  type        = string
  default     = ""
}

variable "aim_role_arn" {
  description = "IAM role ARN attached to the Lambda Function. This governs both who / what can invoke your Lambda Function, as well as what resources our Lambda Function has access to. See Lambda Permission Model for more details."
  type        = string
  default     = ""
}

variable "layers_arn" {
  type    = list(string)
  default = null
}

variable "source_code_hash" {
  type    = string
  default     = null
  description = "Used to trigger updates. Must be set to a base64-encoded SHA256 hash of the package file specified with either filename or s3_key"
}

variable "timeout" {
  description = "Amount of time your Lambda Function has to run in seconds. Defaults to 3"
  type    = string
  default = 3
}

variable "filename" {
  description = "Path to the function's deployment package within the local filesystem. Exactly one of filename, image_uri, or s3_bucket must be specified."
  type    = string
  default = null
}

variable "s3_bucket" {
  description = "S3 bucket location containing the function's deployment package. This bucket must reside in the same AWS region where you are creating the Lambda function. Exactly one of filename, image_uri, or s3_bucket must be specified. When s3_bucket is set, s3_key is required."
  type    = string
  default = null
}

variable "s3_key" {
  description = "S3 key of an object containing the function's deployment package. When s3_bucket is set, s3_key is required."
  type    = string
  default = null
}

variable "s3_object_version" {
  description = "S Object version containing the function's deployment package. Conflicts with filename and image_uri."
  type    = string
  default = null
}



