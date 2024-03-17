#====================VARIABLES================
variable "name" {
  description = "Unique name for your Lambda Layer"
  type        = string
}

variable "s3_bucket" {
  description = "S3 bucket location containing the function's deployment package. Conflicts with filename. This bucket must reside in the same AWS region where you are creating the Lambda function."
  type        = string
}

variable "s3_key" {
  description = "S3 key of an object containing the function's deployment package. Conflicts with filename"
  type        = string
}

variable "runtime" {
  description = " "
  type        = string
}

variable "description" {
  type    = string
  default = ""
}

variable "source_code_hash" {
  type        = string
  default     = null
  description = "Used to trigger updates. Must be set to a base64-encoded SHA256 hash of the package file specified with either filename or s3_key."
}

#==========OUTPUTS==========================

output "created_date" {
  description = "Date this resource was created."
  value       = try(aws_lambda_layer_version.layer.created_date, null)
}

output "source_code_size" {
  description = "Size in bytes of the function .zip file."
  value       = try(aws_lambda_layer_version.layer.source_code_size, null)
}

output "arn" {
  description = "ARN (amazon resource name) of the Lambda Layer with version."
  value       = try(aws_lambda_layer_version.layer.arn, null)
}

output "layer_arn" {
  description = "ARN of the Lambda Layer without version."
  value       = try(aws_lambda_layer_version.layer.layer_arn, null)
}

output "signing_job_arn" {
  description = "ARN of a signing job."
  value       = try(aws_lambda_layer_version.layer.signing_job_arn, null)
}

output "signing_profile_version_arn" {
  description = " ARN for a signing profile version."
  value       = try(aws_lambda_layer_version.layer.signing_profile_version_arn, null)
}

#==============RESOURCES========================

resource "aws_lambda_layer_version" "layer" {
  layer_name          = var.name
  compatible_runtimes = [var.runtime]
  source_code_hash    = var.source_code_hash
  s3_bucket           = var.s3_bucket
  s3_key              = var.s3_key
  description         = var.description

}
