data aws_lambda_layer_version "node_modules_layer"{
  layer_name = local.layer_name_nm
  depends_on = [module.mermesa_node_modules]
}


data aws_s3_object "s3_server"{
  bucket = local.server_bucket_name
  key    = local.server_name_zip
}

data aws_s3_object "s3_server_nm"{
  bucket = local.node_modules_bucket_name
  key    = local.nm_name_zip
}
