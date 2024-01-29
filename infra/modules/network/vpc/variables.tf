variable "name" {
  type = string
}

variable "env" {
  type = string
}


variable "vpc_cidr_block" {
  type = string
  default = "10.0.0.0/16"
}

variable "create_public_subnets" {
  type = bool
  default = true
}

variable "create_private_subnets" {
  type = bool
  default = true
}

variable "create_database_subnets" {
  type = bool
  default = false
}

variable "availability_zones" {
  description = "A list of availability zones names or ids in the region"
  type        = list(string)
  default     = []
}


