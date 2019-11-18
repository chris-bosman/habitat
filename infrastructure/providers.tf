terraform {
    backend "s3" {
        bucket  = "habitat-tf-state"
        key     = "prod.terraform.tfstate"
    }
}

provider "aws" {}

provider "mongodbatlas" {
    username    = "${var.atlas_username}"
    api_key     = "${var.atlas_api_key}"
}