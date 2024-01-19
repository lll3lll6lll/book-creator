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

variable "update" {
  description = "set any value to  update zip data"
  type = string
}

