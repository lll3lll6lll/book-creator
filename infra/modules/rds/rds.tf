locals {
  port = coalesce(var.port, 5432 )
}


#================================================================
resource "aws_db_subnet_group" "this" {
  name        = "${var.name}-db-subnets-group"
  description = "For Aurora cluster ${var.name}"
  subnet_ids  = var.subnets

  tags = var.tags
}

#=========CLUSTER==================================================
resource "aws_rds_cluster" "this" {
  cluster_identifier      = "${var.name}-aurora-cluster"
  engine                  = "aurora-postgresql"
  engine_mode             =  "serverless"
  availability_zones      = var.availability_zones
  database_name           = "${var.name}"
  master_username         = var.master_username
  master_password         = var.master_password
  backup_retention_period = 0 # var.backup_retention_period
  port                    = local.port
  db_subnet_group_name    = aws_db_subnet_group.this.name
  storage_encrypted       = var.storage_encrypted
  skip_final_snapshot     = true
  apply_immediately       =  true
#  manage_master_user_password = true
#  final_snapshot_identifier = "${var.name}-final-snapshot"

  depends_on = [aws_cloudwatch_log_group.this]
}


#=====================CloudWatch Log Group=============================
resource "aws_cloudwatch_log_group" "this"{
  name              = "/aws/rds/cluster/${var.name}"
  retention_in_days = 7
}
