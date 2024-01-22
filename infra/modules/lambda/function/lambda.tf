locals {
  invoked_by = ["logs.amazonaws.com", "apigateway.amazonaws.com"]
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir =  var.source_dir
  output_path = "${var.artifacts_dir}/${var.function_name}.zip"
}

resource "aws_lambda_function" "this" {
  function_name    = var.function_name
  filename         = data.archive_file.lambda_zip.output_path
  description      = var.description
  handler          = var.handler
  role             = var.aim_role_arn
  runtime          = var.runtime
  layers           = var.layers_arn
  depends_on      =  [data.archive_file.lambda_zip]

  environment {
    variables = var.environment_variables
  }

  vpc_config {
    security_group_ids = var.vpc_security_group_ids
    subnet_ids         = var.vpc_subnet_ids
  }
}


resource "aws_lambda_permission" "permission_1" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "apigateway.amazonaws.com"
}

resource "aws_lambda_permission" "permission_2" {
  statement_id  = "AllowLogsInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "logs.amazonaws.com"
}


resource "aws_lambda_permission" "permission_3" {
  statement_id  = "AllowEventsInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "events.amazonaws.com"
}





