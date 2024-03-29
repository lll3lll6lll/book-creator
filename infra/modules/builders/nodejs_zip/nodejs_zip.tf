locals {
  #  ${formatdate("DD-MMM-YY_hh-mm", timestamp())}
  output_name = var.name
  dir         = "${var.artifacts_dir}/${local.output_name}"
  dir_zip     = "${var.artifacts_dir}/${local.output_name}.zip"

  src_files = [
    "${var.path_to_package_json}/package.json",
    "${var.path_to_package_json}/package-lock.json"
  ]
  files_hash = sha256(join("", [for f in local.src_files : file("./${f}")]))
}

data "archive_file" "zip" {
  type        = "zip"
  source_dir  = local.dir
  output_path = local.dir_zip
  depends_on  = [terraform_data.pack_node_modules]
}

resource "terraform_data" "pack_node_modules" {
  triggers_replace = [local.files_hash, var.force]

  provisioner "local-exec" {
    command = <<-EOT

      rm -rf "${local.dir}" || true
      rm -f ${local.dir_zip} || true
      mkdir -p "${local.dir}/nodejs" || true

      cp "${var.path_to_package_json}/package.json" "${local.dir}/nodejs/package.json"
      cp "${var.path_to_package_json}/package-lock.json" "${local.dir}/nodejs/package-lock.json"


      cd  ${local.dir}/nodejs
      npm ci --prefer-offline --omit=dev --omit=optional

    EOT
  }

}


