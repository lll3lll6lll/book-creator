resource "aws_ssm_parameter" "this" {
  name        = var.name
  type        = var.type
  description = var.description

  value          = var.value
  tier            = var.tier
  data_type       = var.data_type

  tags = var.tags
}
