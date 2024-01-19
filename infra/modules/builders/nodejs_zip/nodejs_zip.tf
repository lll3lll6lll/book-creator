locals {
  dir = "${var.artifacts_dir}/${var.name}"
  dir_zip = "${var.artifacts_dir}/${var.name}.zip"
}

data "archive_file" "zip" {
  type        = "zip"
  source_dir =  local.dir
  output_path = local.dir_zip
  depends_on = [ terraform_data.pack_node_modules ]
}

resource "terraform_data" "pack_node_modules" {
  triggers_replace = [var.update]

  provisioner "local-exec" {
    interpreter = ["PowerShell", "-Command"]
    command = <<-EOT

    Remove-Item ${local.dir}
    mkdir -p ${local.dir}/nodejs

    Copy-Item -Path "${var.path_to_package_json}/package.json"  -Destination "${local.dir}/nodejs"
    Copy-Item -Path "${var.path_to_package_json}/package-lock.json"  -Destination "${local.dir}/nodejs"

    cd  ${local.dir}/nodejs
    npm install --prefer-offline --omit=dev --omit=optional

    EOT
  }
}


