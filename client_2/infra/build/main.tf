
data "aws_s3_bucket" "src" {
  bucket = var.s3_bucket.bucket
  depends_on = [module.client_build_bucket]
}

data "aws_s3_object" "src_zip" {
  bucket  = var.s3_bucket.bucket
  key     = local.s3_key

  depends_on = [terraform_data.build,]
}

module "triggers" {
  source = "../../../infra/modules/builders/trigger"
  app_absolute_path = local.project_dir
  file_extensions  = ["ts", "tsx", "js", "jsx", "json", "css", "html"]
  dirs        = ["src"]
  files       = ["package.json","package-lock.json", "tsconfig.json",]
}

locals {
  project_name      = "client_2"
  project_dir       = "${var.root_dir}/${local.project_name}"
  target_dir        = "${var.root_dir}/${var.artifacts_dir}"
  archive_full_name = "${local.target_dir}/${var.s3_bucket.key}.zip"
  s3_key            = var.s3_bucket.key
}

resource "terraform_data" "build" {
  triggers_replace = {
    triggers = module.triggers.triggers
    force = timestamp()
  }
  depends_on = [module.client_build_bucket]

  provisioner "local-exec" {
    interpreter = ["/bin/bash", "-c"]
    command = <<-EOT
      mkdir -p "${local.target_dir}" || true
      rm -f "${local.archive_full_name}" || true

      set -e
      cd "${local.project_dir}"
      export NODE_ENV=production
      npm ci
      npm run build

      cd build
      zip -qr9 "${local.archive_full_name}" .
      aws s3 cp "${local.archive_full_name}" "s3://${data.aws_s3_bucket.src.bucket}/${local.s3_key}"
    EOT
  }
}



output "s3_object" {
  value = {
    bucket      = data.aws_s3_object.src_zip.bucket
    key         = data.aws_s3_object.src_zip.key
    version_id  = data.aws_s3_object.src_zip.version_id
  }
}
