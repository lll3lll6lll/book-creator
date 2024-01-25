variable "name" {
  description = "Name of directory"
  type = string
}

variable "artifacts_dir" {
  description = "Directory name where saved zipped data"
  type = string
}

variable "path_to_package_json" {
  type = string
}


variable "triggers_replace" {
  type = list(string)
  default = null
}

variable "force" {
  type = string
}

