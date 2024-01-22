variable "name" {
  type = string
}

variable "description" {
  type = string
  default = ""
}

variable "lambda_invoke_arn" {
  description = "ARN to be used for invoking Lambda Function from API Gateway"
  type = string
}
