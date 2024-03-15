data aws_s3_bucket "client-build" {
  bucket = var.s3_bucket_name_client_build.bucket
}

data aws_s3_bucket "client-deploy" {
  bucket = var.s3_bucket_name_client_deploy.bucket
  depends_on = [module.bucket_client_deploy ]
}

data aws_s3_object "client-build-src" {
  bucket = var.s3_bucket_name_client_build.bucket
  key    = var.s3_bucket_name_client_build.key
}
