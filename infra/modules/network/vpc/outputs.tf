################################################################################
# VPC
################################################################################

output "vpc_id" {
  description = "The ID of the VPC"
  value       = try(aws_vpc.this.id, null)
}

output "vpc_arn" {
  description = "The ARN of the VPC"
  value       = try(aws_vpc.this.arn, null)
}

output "vpc_cidr_block" {
  description = "The CIDR block of the VPC"
  value       = try(aws_vpc.this.cidr_block, null)
}

output "default_route_table_id" {
  description = "The ID of the default route table"
  value       = try(aws_vpc.this.default_route_table_id, null)
}

output "default_security_group_id" {
  description = "The ID of the security group created by default on VPC creation"
  value       = try(aws_vpc.this.default_security_group_id, null)
}

output "default_network_acl_id" {
  description = "The ID of the default network ACL"
  value       = try(aws_vpc.this.default_network_acl_id, null)
}

output "vpc_owner_id" {
  description = "The ID of the AWS account that owns the VPC"
  value       = try(aws_vpc.this.owner_id, null)
}

################################################################################
# Internet Gateway
################################################################################

output "igw_id" {
  description = "The ID of the Internet Gateway"
  value       = try(aws_internet_gateway.this.id, null)
}

output "igw_arn" {
  description = "The ARN of the Internet Gateway"
  value       = try(aws_internet_gateway.this.arn, null)
}

################################################################################
# Publiс Subnets
################################################################################

output "public_subnets" {
  description = "List of IDs of public subnets"
  value       = aws_subnet.public[*].id
}

output "public_subnet_arns" {
  description = "List of ARNs of public subnets"
  value       = aws_subnet.public[*].arn
}

output "public_subnets_cidr_blocks" {
  description = "List of cidr_blocks of public subnets"
  value       = compact(aws_subnet.public[*].cidr_block)
}

output "public_route_table_id" {
  description = "ID of public route table"
  value       = try(aws_route_table.public.id, null)
}

output "public_internet_gateway_route_id" {
  description = "ID of the internet gateway route"
  value       = try(aws_route.public_internet_gateway.id, null)
}

output "public_route_table_association_ids" {
  description = "List of IDs of the public route table association"
  value       = aws_route_table_association.public[*].id
}

#output "public_network_acl_id" {
#  description = "ID of the public network ACL"
#  value       = try(aws_network_acl.public[0].id, null)
#}


################################################################################
# Private Subnets
################################################################################

output "private_subnets" {
  description = "List of IDs of private subnets"
  value       = aws_subnet.private[*].id
}

output "private_subnet_arns" {
  description = "List of ARNs of private subnets"
  value       = aws_subnet.private[*].arn
}

output "private_subnets_cidr_blocks" {
  description = "List of cidr_blocks of private subnets"
  value       = compact(aws_subnet.private[*].cidr_block)
}

output "private_subnets_ipv6_cidr_blocks" {
  description = "List of IPv6 cidr_blocks of private subnets in an IPv6 enabled VPC"
  value       = compact(aws_subnet.private[*].ipv6_cidr_block)
}


################################################################################
# Database Subnets
################################################################################

output "database_subnets" {
  description = "List of IDs of database subnets"
  value       = aws_subnet.database[*].id
}

output "database_subnet_arns" {
  description = "List of ARNs of database subnets"
  value       = aws_subnet.database[*].arn
}

output "database_subnets_cidr_blocks" {
  description = "List of cidr_blocks of database subnets"
  value       = compact(aws_subnet.database[*].cidr_block)
}

output "database_subnets_ipv6_cidr_blocks" {
  description = "List of IPv6 cidr_blocks of database subnets in an IPv6 enabled VPC"
  value       = compact(aws_subnet.database[*].ipv6_cidr_block)
}

