
module "triggers_src" {
  source = "../../../infra/modules/builders/trigger"
  app_absolute_path = "${var.root_dir}/server"
  file_extensions  = ["ts", "js", "jsx", "json"]
  dirs        = ["src"]
#  files       = ["package.json","package-lock.json", "tsconfig.json",]
}

resource "terraform_data" "server_code_build" {
  triggers_replace = {
    triggers = module.triggers_src.triggers
#    force = timestamp()
  }

  depends_on = [module.server_build_bucket]

  provisioner "local-exec" {
    interpreter = ["/bin/bash", "-c"]
    command = <<-EOT
    mkdir -p "${local.target_dir}" || true
    rm -f "${local.absolut_server_name_zip}" || true

    set -e
    cd "${local.project_dir}"
    export NODE_ENV=production

    npm ci
    npm run build

    cd dist
    zip -qr9 "${local.absolut_server_name_zip}" .
    aws s3 cp "${local.absolut_server_name_zip}" "s3://${data.aws_s3_bucket.server_data.bucket}"

    EOT
  }
}


