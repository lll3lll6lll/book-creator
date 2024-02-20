

resource "aws_lambda_layer_version" "layer" {
  layer_name          = var.name
  filename            = var.filename
  compatible_runtimes = [var.runtime]
  source_code_hash    = var.source_code_hash
  description         = var.description

}
