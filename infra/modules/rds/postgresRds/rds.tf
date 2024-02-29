locals {
  name = "${var.name}-${var.env}-postgres"
}

resource "aws_db_subnet_group" "this" {
  name        = "${var.name}-postgress-subnets-group"
  description = "For Postgres rds cluster ${var.name}"
  subnet_ids  = var.subnets

  tags = var.tags
}

resource "random_password" "password" {
  length           = 20
  special          = false
  override_special = "_%@"
}

resource "aws_db_instance" "this" {
  db_name                = "${var.name}${var.env}"
  allocated_storage      = 20
  db_subnet_group_name   = aws_db_subnet_group.this.name
  engine                 = "postgres"
  identifier             = local.name
  engine_version         = "16.1"
  instance_class         = "db.t3.micro"
  username               = "postgres"
  password               = random_password.password.result
  skip_final_snapshot    = true
  publicly_accessible    = true
  multi_az = false
  vpc_security_group_ids = [aws_security_group.allow_db.id]
  parameter_group_name  = aws_db_parameter_group.this.name

}

resource "aws_db_parameter_group" "this" {
  name   = local.name
  family = "postgres16"

  parameter {
    name  = "log_connections"
    value = "1"
  }
}

resource "aws_security_group" "allow_db" {
  name = "postgres_${local.name}"
  vpc_id = var.vpc_id

  ingress {
    description      = "TLS from VPC"
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
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
