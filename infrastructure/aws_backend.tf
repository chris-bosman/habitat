variable "AWS_ACCOUNT_ID" {}
variable "AWS_ACCOUNT_SECRET" {}
variable "ORG_NAME" {}
variable "ENV" {}
variable "REGION" {}

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

data "aws_iam_instance_profile" {
    name    = "${var.ORG_NAME}-iam-eb-profile"
}

resource "aws_elastic_beanstalk_application" "deployment" {
    name    = "${var.ORG_NAME}-ebapp-${var.ENV}-${var.REGION}"
}

resource "aws_elastic_beanstalk_environment" "deployment" {
    name                = "${var.ORG_NAME}-ebenv-${var.ENV}-${var.REGION}"
    application         = "${aws_elastic_beanstalk_application.deployment.name}"
    solution_stack_name = "64bit Amazon Linux 2018.03 v4.8.2 running Node.js"

    setting {
        namespace   = "aws:autoscaling:launchconfiguration"
        name        = "IamInstaneProfile"
        value       = "${data.aws_iam_instance_profile.name}"
    }
}