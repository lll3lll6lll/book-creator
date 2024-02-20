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
  default     = null
}


variable "vpc_subnet_ids" {
  description = "List of subnet ids when Lambda Function should run in the VPC. Usually private or intra subnets."
  type        = list(string)
  default     = null
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

variable "force" {
  type    = string
  default = ""
}



##########################
# Build artifact settings
##########################

variable "source_dir" {
  description = "The absolute path to a local file or directory containing your Lambda source code"
  type        = string
}

variable "artifacts_dir" {
  description = "Directory name where temp files should be stored"
  type        = string
}
