variable "atlas_username" {}
variable "atlas_api_key" {}

provider "mongodbatlas" {
    username    = "${var.atlas_username}"
    api_key     = "${var.atlas_api_key}"
}

resource "mongodbatlas_cluster" "deployment" {}