locals {
  port = coalesce(var.port, 5432)
}


#================================================================
resource "aws_db_subnet_group" "this" {
  name        = "${var.name}-aurora-db-subnets-group"
  description = "For Aurora cluster ${var.name}"
  subnet_ids  = var.subnets

  tags = var.tags
}

#=========CLUSTER==================================================
resource "aws_rds_cluster" "this" {
  cluster_identifier      = "${var.name}-aurora-cluster"
  engine                  = "aurora-postgresql"
  engine_mode             = "serverless"
  availability_zones      = var.availability_zones
  database_name           = var.name
  master_username         = var.master_username
  master_password         = var.master_password
  backup_retention_period = var.backup_retention_period
  port                    = local.port
  db_subnet_group_name    = aws_db_subnet_group.this.name
  storage_encrypted    = var.storage_encrypted
  skip_final_snapshot  = true
  apply_immediately    = true
  #  manage_master_user_password = true
  #  final_snapshot_identifier = "${var.name}-final-snapshot"
  vpc_security_group_ids = [aws_security_group.this.id]

  scaling_configuration {
    auto_pause               = true
    min_capacity             = 2
    max_capacity             = 16
    seconds_until_auto_pause = 300
    timeout_action           = "ForceApplyCapacityChange"
  }

  depends_on = [aws_cloudwatch_log_group.this]
}

resource "aws_security_group" "this" {
  name        = "allow_db"
  description = "Allow DB"
  vpc_id      = var.vpc_id

  ingress {
    from_port        = 5432
    to_port          = 5440
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}



#=====================CloudWatch Log Group=============================
resource "aws_cloudwatch_log_group" "this" {
  name              = "/aws/aurora-rds/cluster/${var.name}"
  retention_in_days = 7
}
