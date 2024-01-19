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
  type        = string
  default      =  ""
}

