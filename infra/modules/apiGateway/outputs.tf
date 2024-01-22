
output "arn" {
  description = "ARN of the API."
  value = aws_apigatewayv2_api.graphql.arn
}
output "execution_arn" {
  description = "ARN prefix to be used in an aws_lambda_permission's source_arn attribute or in an aws_iam_policy to authorize access to the @connections API. "
  value = aws_apigatewayv2_api.graphql.execution_arn
}

output "api_endpoint" {
  description = "URI of the API, of the form https://{api-id}.execute-api.{region}.amazonaws.com for HTTP APIs and wss://{api-id}.execute-api.{region}.amazonaws.com for WebSocket APIs."
  value = aws_apigatewayv2_api.graphql.api_endpoint
}
