variable "artifacts_dir" {
  type = string
}

variable "root_dir" {
  type = string
}

variable "s3_bucket" {
  type = object({
    bucket  = string
    key     = string
  })
}

data "aws_s3_bucket" "src" {
  bucket = var.s3_bucket.bucket
}

module "triggers" {
  source = "../../../infra/modules/builders/trigger"
  app_absolute_path = local.project_dir
  file_extensions  = ["ts", "tsx", "js", "jsx", "json", "css", "html"]
  dirs        = ["src"]
  files       = ["package.json","package-lock.json", "tsconfig.json",]
}

locals {
  project_dir       = "${var.root_dir}/client"
  target_dir        = "${abspath(path.root)}/${var.artifacts_dir}/client"
  archive_full_name = "${local.target_dir}/client-src-build.zip"
  s3_key            = "${var.s3_bucket.key}/client/src"
}

resource "terraform_data" "build" {
  triggers_replace = [module.triggers.triggers, "14"]

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
    EOT
  }
}

#cd "${local.project_dir}/dist"
#
#zip -qr9 "${local.archive_full_name}" .
#aws s3 cp "${local.archive_full_name}" "s3://${data.aws_s3_bucket.src.bucket}/${local.s3_key}"

#data "aws_s3_object" "src_zip" {
#  bucket  = var.s3_bucket.bucket
#  key     = local.s3_key
#
#  depends_on = [terraform_data.build]
#}
#
#output "s3_object" {
#  value = {
#    bucket      = data.aws_s3_object.src_zip.bucket
#    key         = data.aws_s3_object.src_zip.key
#    version_id  = data.aws_s3_object.src_zip.version_id
#  }
#}
