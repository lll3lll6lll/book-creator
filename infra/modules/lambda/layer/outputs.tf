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

output "version" {
  description = " Lambda Layer version."
  value       = try(aws_lambda_layer_version.layer.version, null)
}

output "created_date" {
  description = "Date this resource was created."
  value       = try(aws_lambda_layer_version.layer.created_date, null)
}

output "source_code_size" {
  description = "Size in bytes of the function .zip file."
  value       = try(aws_lambda_layer_version.layer.source_code_size, null)
}
