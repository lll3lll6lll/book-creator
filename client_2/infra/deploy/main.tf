data "aws_s3_object" "src" {
  bucket      = var.s3_bucket_name_client_build.bucket
  key         = var.s3_bucket_name_client_build.key
  depends_on = [module.bucket_client_deploy]
}

data "aws_s3_bucket" "target" {
  bucket = var.s3_bucket_name_client_deploy.bucket
  depends_on = [module.bucket_client_deploy]
}

locals {
  project_name      = "client_2"
  project_dir       = "${var.root_dir}/${local.project_name}"

  version_id =data.aws_s3_object.src.version_id
  temp_file = "${var.root_dir}/${var.artifacts_dir}.zip"
  temp_dir  = "${var.root_dir}/${var.artifacts_dir}"

  key = replace(replace(try(var.s3_bucket_name_client_deploy.key, ""), "/[/]+$/", ""), "/^[/]+/", "")
  s3_target_key = local.key == "" ? "/" : "/"

  remove_filter = local.key == "" ? "--include '*'" : "--exclude '*' --include ${local.key}/*"
  cf_invalidation_filter = local.key == "" ? "'/*'" : "'/${local.key}/*'"
}

module "triggers" {
  source = "../../../infra/modules/builders/trigger"
  app_absolute_path = local.project_dir
  file_extensions  = ["ts", "tsx", "js", "jsx", "json", "css", "html"]
  dirs        = ["src"]
  files       = ["package.json","package-lock.json", "tsconfig.json",]
}


resource "terraform_data" "deploy" {
  depends_on = [data.aws_s3_object.src, data.aws_s3_bucket.target]
  triggers_replace = {
    triggers = module.triggers.triggers
    object = var.s3_bucket_name_client_build
    target = var.s3_bucket_name_client_deploy
#    force  = timestamp()
  }

  provisioner "local-exec" {
    interpreter = ["/bin/bash", "-c"]
    command = <<-EOT
      set -e

      rm -f "${local.temp_file}" || true
      rm -rf "${local.temp_dir}" || true

      mkdir -p "${local.temp_dir}"
      touch "${local.temp_file}"
      aws s3api get-object --bucket "${var.s3_bucket_name_client_build.bucket}" --key "${var.s3_bucket_name_client_build.key}" \
                          --version-id="${local.version_id}" --output json "${local.temp_file}"
      unzip "${local.temp_file}" -d "${local.temp_dir}"

      echo "Check if all the file extensions are supported"

      for f in $(find "${local.temp_dir}" -type f)
      do
        file_key=`echo "$f" | cut -c ${length(local.temp_dir) + 2}-`
        extension="$${file_key##*.}"
        case $extension in
          map | png | json | svg | html | js | css | ico | txt | gitkeep)
          ;;
          *)
            echo "ERROR: Unknown file extension: $extension" 1>&2
            exit 1
          ;;
        esac
      done

      cd "${local.temp_dir}"
      aws s3 rm s3://${data.aws_s3_bucket.target.bucket}/ --recursive ${local.remove_filter}

      echo "checking extension  ${local.temp_dir} "

      for f in $(find "${local.temp_dir}" -type f)
      do
        file_key=`echo "$f" | cut -c ${length(local.temp_dir) + 2}-`
        filename=$(basename -- "$file_key")
        extension="$${file_key##*.}"

        case $extension in
          html)
            content_type="text/html"
          ;;
          js)
            content_type="application/javascript"
          ;;
          css)
            content_type="text/css"
          ;;
          ico)
            content_type="image/vnd.microsoft.icon"
          ;;
          png)
            content_type="image/png"
          ;;
          json)
            content_type="application/json"
          ;;
          svg)
            content_type="image/svg+xml"
          ;;
          map)
            content_type="application/json"
          ;;
          txt | gitkeep)
            content_type="text/plain"
          ;;
          *)
            echo "ERROR: Unknown file extension: $extension" 1>&2
            exit 1
          ;;
        esac

        echo ""
        echo "Upload file: $file_key, content_type=$content_type"
        aws s3 cp --content-type "$content_type" "$file_key" "s3://${data.aws_s3_bucket.target.bucket}${local.s3_target_key}$file_key"
        echo "Done: $file_key"
        echo ""
      done

      echo ""
      echo "Create cloudfront invalidation"

      aws cloudfront create-invalidation --no-cli-pager --distribution-id "${aws_cloudfront_distribution.ui.id}" --paths ${local.cf_invalidation_filter}

    EOT
  }
}

