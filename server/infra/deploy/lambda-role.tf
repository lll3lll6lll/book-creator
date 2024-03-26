
data "aws_iam_policy_document" "server_lambda_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "server_lambda_role" {
  name                = "ServiceRoleForLambda_${var.name}"
  assume_role_policy  = data.aws_iam_policy_document.server_lambda_assume_role_policy.json
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AWSLambda_FullAccess",
    "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole",
    "arn:aws:iam::aws:policy/AmazonRDSFullAccess"
  ]
}
