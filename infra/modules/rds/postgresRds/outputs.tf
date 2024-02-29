output "rds_hostname" {
  description = "RDS instance hostname"
  value       = aws_db_instance.this.address
  sensitive   = true
}

output "rds_port" {
  description = "RDS instance port"
  value       = aws_db_instance.this.port
  sensitive   = true
}

output "rds_username" {
  description = "RDS instance root username"
  value       = aws_db_instance.this.username
  sensitive   = true
}

output "rds_database_name" {
  value       = aws_db_instance.this.db_name
  sensitive   = true
}

output "rds_password" {
  description = "RDS password"
  value       = random_password.password.result
}
