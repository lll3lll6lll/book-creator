variable "authentication_type" {
  description = "Authentication type. Valid values: API_KEY, AWS_IAM, AMAZON_COGNITO_USER_POOLS, OPENID_CONNECT, AWS_LAMBDA"
  type        = string
  default = "AWS_IAM"
}

variable "name" {
  description = "Name of GraphQL API"
  type        = string
}

variable "schema" {
  description = "The schema definition, in GraphQL schema language format. Terraform cannot perform drift detection of this configuration."
  type        = string
}

variable "visibility" {
  description = "Sets the value of the GraphQL API to public (GLOBAL) or private (PRIVATE). If no value is provided, the visibility will be set to GLOBAL by default. This value cannot be changed once the API has been created."
  type = string
  default = "GLOBAL"
}
