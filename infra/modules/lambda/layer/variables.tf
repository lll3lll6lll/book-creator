variable "name" {
  description = "Unique name for your Lambda Layer"
  type        = string
}

variable "filename" {
  description = "Path to the function's deployment package within the local filesystem"
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
