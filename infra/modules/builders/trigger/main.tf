variable "app_absolute_path" {
  type = string
  #  default = "/Users/mikalaipuliak/Desktop/finops/finops-core/portal/apps/frontend"
}

variable "dirs" {
  type = list(string)
  #  default = ["src"]
}

variable "files" {
  type = list(string)
  #  default = ["package.json","package-lock.json", "tsconfig.json"]
}

variable "file_extensions" {
  type = list(string)
  #  default = ["ts"]
}

locals {
  filenames_hash        = sha256(join("", var.files.*))
  files_content_hash    = sha256(join("", [for file_name in var.files: filesha256("${var.app_absolute_path}/${file_name}")]))
  files_content_length  = length(var.files)

  dirs_filenames        = {for dir_name in var.dirs: dir_name => [for file_name in fileset("${var.app_absolute_path}/${dir_name}", "**/*.{${join(",",var.file_extensions)}}"): file_name]}
  dirs_filenames_hash   = {for dir_name, file_names in local.dirs_filenames: dir_name => sha256(join(",", file_names))}
  dirs_filenames_length = {for dir_name, file_names in local.dirs_filenames: dir_name => length(file_names)}
  dirs_filenames_content_hash = {for dir_name, file_names in local.dirs_filenames: dir_name => sha256(join(",", [for file_name in file_names: filesha256("${var.app_absolute_path}/${dir_name}/${file_name}")]))}

  merged_triggers = {for dir_name in var.dirs: dir_name => {
    content   = local.dirs_filenames_content_hash[dir_name]
    filenames = local.dirs_filenames_hash[dir_name]
    length    = local.dirs_filenames_length[dir_name]
  }}

  output_triggers = {
    files = {
      content   = local.files_content_hash
      filenames = local.filenames_hash
      length    = local.files_content_length
    }
    dirs = local.merged_triggers
  }

  dirs_hash = sha256(join(",", [for dir_name in var.dirs: "${local.output_triggers.dirs[dir_name].length}/${local.output_triggers.dirs[dir_name].filenames}/${local.output_triggers.dirs[dir_name].content}"]))
  files_hash = sha256("${local.output_triggers.files.length}/${local.output_triggers.files.filenames}/${local.output_triggers.files.content}")
  single_hash = sha256("${local.dirs_hash}.${local.files_hash}")
}

output "triggers" {
  value = local.output_triggers
}

output "single_hash" {
  value = local.single_hash
}
