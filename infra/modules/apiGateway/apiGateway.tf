
resource "aws_cloudwatch_log_group" "main_api_gw" {
  name = "/aws/api-gw/${aws_apigatewayv2_api.graphql.name}"
  retention_in_days = 7
}

resource "aws_apigatewayv2_api" "graphql" {
  name          = "${var.name}"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins     = [
      "http://localhost:3000",
      "https://studio.apollographql.com"
    ]
    allow_credentials = true
    allow_headers     = ["Authorization", "Content-Type", "Origin", "X-Xsrf-Token"]
    allow_methods     = ["GET", "POST", "DELETE", "OPTIONS"]
  }
}

resource "aws_apigatewayv2_route" "root" {
  api_id    = aws_apigatewayv2_api.graphql.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
  depends_on = [
    aws_apigatewayv2_integration.lambda,
  ]
}

resource "aws_apigatewayv2_stage" "gtw-2" {
  api_id = aws_apigatewayv2_api.graphql.id
  name   = var.stage_name
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.main_api_gw.arn
    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
    }
    )
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id           = aws_apigatewayv2_api.graphql.id
  integration_uri  = var.lambda_invoke_arn
  integration_type = "AWS_PROXY"
}

