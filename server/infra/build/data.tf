data "aws_s3_bucket" "server_data" {
  bucket = local.server_bucket_name
  depends_on = [module.server_bucket]
}


data "aws_s3_bucket" "server_node_modules_data" {
  bucket = local.node_modules_bucket_name
  depends_on = [module.server_node_modules_bucket]
}
