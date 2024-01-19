output "function_name" {
  description = "Lambda function name"
  value       = try(aws_lambda_function.this.function_name, null)
}

output "arn" {
  description = "Amazon Resource Name (ARN) identifying your Lambda Function."
  value       = try(aws_lambda_function.this.arn, null)
}

output "last_modified" {
  description = " Date this resource was last modified."
  value       = try(aws_lambda_function.this.last_modified, null)
}

output "version" {
  description = "Latest published version of your Lambda Function."
  value       = try(aws_lambda_function.this.version, null)
}

output "vpc_id" {
  description = " ID of the VPC."
  value       = try(aws_lambda_function.this.vpc_config[0].vpc_id, null)
}

output "invoke_arn" {
  description = " ARN to be used for invoking Lambda Function from API Gateway - to be used in aws_api_gateway_integration's uri."
  value       = try(aws_lambda_function.this.invoke_arn, null)
}
output "qualified_arn" {
  description = "ARN identifying your Lambda Function Version (if versioning is enabled via publish = true)."
  value       = try(aws_lambda_function.this.qualified_arn, null)
}

output "qualified_invoke_arn" {
  description = "Qualified ARN (ARN with lambda version number) to be used for invoking Lambda Function from API Gateway - to be used in aws_api_gateway_integration's uri."
  value       = try(aws_lambda_function.this.qualified_invoke_arn, null)
}


