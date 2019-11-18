resource "mongodbatlas_project" "deployment" {
    org_id  = "${var.atlas_org_id}"
    name    = "${var.atlas_org_name}"
}

resource "mongodbatlas_cluster" "deployment" {
    name                    = "${var.atlas_org_name}-HQ"
    group                   = "${mongodbatlas_project.deployment.id}"
    mongodb_major_version   = "4.0"
    provider_name           = "TENANT"
    backing_provider        = "${var.atlas_provider}"
    region                  = "${var.atlas_region}"
    size                    = "M0"
    backup                  = false
    disk_gb_enabled         = false
    disk_size_gb            = "0.5"
}