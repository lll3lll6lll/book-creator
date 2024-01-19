output archive_file {
  value = data.archive_file.zip
}

output archive_file_id {
  value = data.archive_file.zip.id
}

output "output_path" {
  value = data.archive_file.zip.output_path
}

output "output_size" {
  value = data.archive_file.zip.output_size
}

output "filename" {
  value = local.dir_zip
}
