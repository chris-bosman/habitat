variable "atlas_username" {}
variable "atlas_api_key" {}
variable "atlas_org_id" {}
variable "atlas_org_name" {}
variable "atlas_provider" {}
variable "atlas_region" {}

terraform {
    backend "s3" {
        bucket  = "habitat-tf-state"
        key     = "tfstate"
        region  = "us-east-1"
    }
}

provider "mongodbatlas" {
    username    = "${var.atlas_username}"
    api_key     = "${var.atlas_api_key}"
}

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