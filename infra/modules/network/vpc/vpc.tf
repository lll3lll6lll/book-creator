data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_subnets" "public" {
  filter {
    name   = "vpc-id"
    values = [aws_vpc.this.id]
  }
  tags = {
    Tier = "public"
  }
}


locals {
  name = "${var.name}-${var.env}"
  az_names =  data.aws_availability_zones.available.names
}



#====== VPC =====
resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = merge(
    { Name = local.name },
  )
}

#====== IGW =====
resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id
  tags = merge(
    { Name = "${local.name }-igw"}
  )
}


#====== PUBLIC SUBNETS =====
resource "aws_subnet" "public" {
  count = var.create_public_subnets ? length(local.az_names) : 0
  vpc_id     = aws_vpc.this.id
  cidr_block = "10.0.1${count.index}.0/24"
  availability_zone = local.az_names[count.index]
  map_public_ip_on_launch = "true"
  tags = merge({
    Name = "${local.name }-public-${local.az_names[count.index]}"
    Tier = "public"
  })
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }
  tags = {
    Name = "${local.name }-public-rt"
    Tier = "public"
  }
}

resource "aws_route_table_association" "public" {
  for_each      = toset(data.aws_subnets.public.ids)
  subnet_id   = each.value
  route_table_id = aws_route_table.public.id
}


#====== PRIVATE SUBNETS =====
resource "aws_subnet" "private" {
  count = var.create_private_subnets ? length(local.az_names) : 0
  vpc_id     = aws_vpc.this.id
  cidr_block = "10.0.2${count.index}.0/24"
  availability_zone = local.az_names[count.index]
  map_public_ip_on_launch = "false"
  tags = merge({
    Name = "${local.name }-private-${local.az_names[count.index]}"
    Tier = "private"
  })
}

#====== DATABASE SUBNETS =====
resource "aws_subnet" "database" {
  count = var.create_database_subnets ? length(local.az_names) : 0
  vpc_id     = aws_vpc.this.id
  cidr_block = "10.0.3${count.index}.0/24"
  availability_zone = local.az_names[count.index]
  map_public_ip_on_launch = "false"
  tags = merge({
    Name = "${local.name }-database-${local.az_names[count.index]}"
    Tier = "database"
  })
}
