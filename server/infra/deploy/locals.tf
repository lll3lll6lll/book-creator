locals {
  project_dir       = "${var.root_dir}/server"
  target_dir        = "${var.root_dir}/${var.artifacts_dir}"

  server_name      = "server"
  server_name_zip  = "${local.server_name}.zip"
  absolut_server_name_zip = "${local.target_dir}/${local.server_name_zip}"

  nm_name = "server_node_modules"
  nm_name_zip = "${local.nm_name}.zip"
  absolut_nm_name = "${local.target_dir}/${local.nm_name}"
  absolut_nm_name_zip = "${local.target_dir}/${local.nm_name_zip}"
}
