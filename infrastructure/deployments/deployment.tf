variable "SOFTWARE_VERSION" {}
variable "ORG_NAME" {}
variable "FUNCTION" {}
variable "ENV" {}
variable "REGION" {}

terraform {
    backend "s3" {
        bucket  = "habitat-tf-state"
        key     = "prod.terraform.tfstate"
    }
}

provider "aws" {}

data "aws_s3_bucket" "deployments" {
    bucket  = "${var.ORG_NAME}-${var.FUNCTION}-${var.ENV}-${var.REGION}"
}

data "aws_s3_bucket_object" "deploy_zip" {
    bucket  = "${data.aws_s3_bucket.deployments.id}"
    key     = "${var.SOFTWARE_VERSION}/habitat.zip"
}

resource "aws_elastic_beanstalk_application_version" "release" {
    name        = "${var.ORG_NAME}-ebrelease-${var.ENV}-${var.REGION}-${var.SOFTWARE_VERSION}"
    application = "${var.ORG_NAME}-ebenv-${var.ENV}-${var.REGION}"
    bucket      = "${data.aws_s3_bucket.deployments.id}"
    key         = "${data.aws_s3_bucket_object.deploy_zip.id}"
}