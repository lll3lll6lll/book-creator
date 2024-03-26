

resource "aws_lambda_function" "this" {
  function_name    = var.function_name
  filename         = var.filename
  description      = var.description
  handler          = var.handler
  role             = var.aim_role_arn
  runtime          = var.runtime
  layers           = var.layers_arn
  source_code_hash = var.source_code_hash
  timeout          = var.timeout
  s3_bucket        = var.s3_bucket
  s3_key           = var.s3_key
  s3_object_version = var.s3_object_version

  environment {
    variables = var.environment_variables
  }

    vpc_config {
      security_group_ids = var.vpc_security_group_ids
      subnet_ids         = var.vpc_subnet_ids
    }
}


resource "aws_lambda_permission" "permission_1" {
  statement_id  = "AllowAPIGatewayInvoke1"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "apigateway.amazonaws.com"
  depends_on    = [aws_lambda_function.this]
}

resource "aws_lambda_permission" "permission_2" {
  statement_id  = "AllowLogsInvoke1"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "logs.amazonaws.com"
  depends_on    = [aws_lambda_function.this]
}


resource "aws_lambda_permission" "permission_3" {
  statement_id  = "AllowEventsInvoke1"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "events.amazonaws.com"
  depends_on    = [aws_lambda_function.this]
}





