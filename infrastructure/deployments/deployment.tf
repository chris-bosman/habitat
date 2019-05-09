variable "SOFTWARE_VERSION" {}
variable "ORG_NAME" {}
variable "FUNCTION" {}
variable "ENV" {}
variable "REGION" {}
variable "ENVIRONMENT" {}

terraform {
    backend "s3" {
        bucket  = "habitat-tf-state"
        key     = "prod.terraform.tfstate"
    }
}

provider "aws" {}

data "aws_iam_policy" "AWSElasticBeanstalkWebTier" {
  arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_role" "elb" {
    name        = "${var.ORG_NAME}-iam-eb-role"

    assume_role_policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "deployment" {
    role        = "${aws_iam_role.elb.name}"
    policy_arn  = "${data.aws_iam_policy.AWSElasticBeanstalkWebTier.arn}"
}

resource "aws_iam_instance_profile" "deployment" {
    name        = "${var.ORG_NAME}-iam-eb-profile"
    role        = "${aws_iam_role.elb.name}"
}

resource "aws_elastic_beanstalk_application" "deployment" {
    name    = "${var.ORG_NAME}-ebapp-${var.ENV}-${var.REGION}"
}

resource "aws_elastic_beanstalk_environment" "deployment" {
    name                = "${var.ORG_NAME}-ebenv-${var.ENV}-${var.REGION}"
    application         = "${aws_elastic_beanstalk_application.deployment.name}"
    solution_stack_name = "64bit Amazon Linux 2018.03 v4.8.3 running Node.js"

    setting {
        namespace   = "aws:autoscaling:launchconfiguration"
        name        = "IamInstanceProfile"
        value       = "${aws_iam_instance_profile.deployment.name}"
    }
}

resource "aws_s3_bucket" "deployment" {
    bucket  = "${var.ORG_NAME}-${var.FUNCTION}-${var.ENV}-${var.REGION}"
    acl     = "private"

    tags {
        environment     = "${var.ENVIRONMENT}"
    }
}

data "aws_s3_bucket_object" "deploy_zip" {
    bucket  = "${aws_s3_bucket.deployment.id}"
    key     = "${var.SOFTWARE_VERSION}/habitat.zip"
}

resource "aws_elastic_beanstalk_application_version" "release" {
    name        = "${var.ORG_NAME}-ebrelease-${var.ENV}-${var.REGION}-${var.SOFTWARE_VERSION}"
    application = "${var.ORG_NAME}-ebenv-${var.ENV}-${var.REGION}"
    bucket      = "${aws_s3_bucket.deployment.id}"
    key         = "${data.aws_s3_bucket_object.deploy_zip.id}"
}