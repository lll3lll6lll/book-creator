variable "name" {
  description = "Name used across resources created"
  type        = string
  default     = ""
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = {}
}

variable "subnets" {
  description = "List of subnet IDs used by database subnet group created"
  type        = list(string)
  default     = []
}

variable "port" {
  description = "The port on which the DB accepts connections"
  type        = string
  default     = null
}

variable "master_username" {
  description = "Username for the master DB user. Required unless `snapshot_identifier` or `replication_source_identifier` is provided or unless a `global_cluster_identifier` is provided when the cluster is the secondary cluster of a global database"
  type        = string
  default     = null
}

variable "storage_encrypted" {
  description = "Specifies whether the DB cluster is encrypted. The default is `true`"
  type        = bool
  default     = true
}

variable "skip_final_snapshot" {
  description = "Determines whether a final snapshot is created before the cluster is deleted. If true is specified, no snapshot is created"
  type        = bool
  default     = true
}

variable "backup_retention_period" {
  description = "The days to retain backups for"
  type        = number
  default     = 7
}

variable "monitoring_interval" {
  description = "The interval, in seconds, between points when Enhanced Monitoring metrics are collected for instances. Set to `0` to disable. Default is `0`"
  type        = number
  default     = 0
}

variable "availability_zones" {
  description = "List of EC2 Availability Zones for the DB cluster storage where DB cluster instances can be created. RDS automatically assigns 3 AZs if less than 3 AZs are configured, which will show as a difference requiring resource recreation next Terraform apply"
  type        = list(string)
  default     = null
}

variable "master_password" {
  description = "Password for the master DB user. Note that this may show up in logs, and it will be stored in the state file. Required unless `manage_master_user_password` is set to `true` or unless `snapshot_identifier` or `replication_source_identifier` is provided or unless a `global_cluster_identifier` is provided when the cluster is the secondary cluster of a global database"
  type        = string
  default     = null
}

