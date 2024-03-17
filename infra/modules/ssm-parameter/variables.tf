variable "name" {
  description = "Name of SSM parameter"
  type        = string
}

variable "value" {
  description = "Value of the parameter"
  type        = string
}

variable "description" {
  description = "Description of the parameter"
  type        = string
}

variable "type" {
  description = "Type of the parameter. Valid types are String, StringList and SecureString."
  type        = string
}

variable "tier" {
  description = "Parameter tier to assign to the parameter. If not specified, will use the default parameter tier for the region. Valid tiers are Standard, Advanced, and Intelligent-Tiering. Downgrading an Advanced tier parameter to Standard will recreate the resource."
  type        = string
  default     = null
}

variable "data_type" {
  description = "Data type of the parameter. Valid values: text, aws:ssm:integration and aws:ec2:image for AMI format."
  type        = string
  default     = null
}

variable "tags" {
  description = "A mapping of tags to assign to resources"
  type        = map(string)
  default     = {}
}
