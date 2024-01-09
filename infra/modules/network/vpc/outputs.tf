output vpc_id {
  value = aws_vpc.this.id
}

output igw_id {
  value = aws_internet_gateway.this.id
}

output "subnets_public" {
  value = [for s in data.aws_subnets.public : s]
}
