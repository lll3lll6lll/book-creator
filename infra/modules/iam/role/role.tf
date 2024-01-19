#========VARIABLES=========

variable "name" {
  description = "Friendly name of the role. "
  type = string
}

variable "path_to_assume_role_policy" {
  description = "Policy that grants an entity permission to assume the role."
  type = string
}

variable "managed_policy_arns" {
  description = "Policies arns that grants an entity permission to assume the role."
  type = list(string)
  default = null
}




#========ROLE=========

resource "aws_iam_role" "this" {
  name = var.name
  assume_role_policy = file(var.path_to_assume_role_policy)
  managed_policy_arns = var.managed_policy_arns
}



#========OUTPUTS=========

output "arn" {
  description = "Amazon Resource Name (ARN) specifying the role."
  value = aws_iam_role.this.arn
}

output "unique_id" {
  description = "Stable and unique string identifying the role."
  value = aws_iam_role.this.unique_id
}

output "name" {
  description = "Name of the role."
  value = aws_iam_role.this.name
}

output "create_date" {
  description = "Creation date of the IAM role."
  value = aws_iam_role.this.create_date
}
