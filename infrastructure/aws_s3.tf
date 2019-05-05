variable "AWS_ACCOUNT_ID" {}
variable "AWS_ACCOUNT_SECRET" {}
variable "ORG_NAME" {}
variable "ENV" {}
variable "ENVIRONMENT" {}
variable "REGION" {}
variable "FUNCTION" {}

terraform {
    backend "s3" {
        bucket  = "habitat-tf-state"
        key     = "tfstate"
        region  = "us-east-1"
    }
}

provider "aws" {
    access_key  = "${var.AWS_ACCOUNT_ID}"
    secret_key  = "${var.AWS_ACCOUNT_SECRET}"
    region      = "us-east-1"
}

resource "aws_s3_bucket" "deployment" {
    bucket  = "${var.ORG_NAME}-${var.FUNCTION}-${var.ENV}-${var.REGION}"
    acl     = "private"

    tags {
        environment     = "${var.ENVIRONMENT}"
    }
}