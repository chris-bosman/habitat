variable "AWS_ACCOUNT_ID" {}
variable "AWS_ACCOUNT_SECRET" {}
variable "ORG_NAME" {}

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

data "aws_iam_policy" "AWSElasticBeanstalkWebTier" {
  arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_role_policy_attachment" "deployment" {
    role        = "${aws_iam_role.elb.name}"
    policy_arn  = "${data.aws_iam_policy.AWSElasticBeanstalkWebTier.arn}"
}

resource "aws_iam_instance_profile" "deployment" {
    name        = "${var.ORG_NAME}-iam-eb-profile"
    role        = "${aws_iam_role.elb.name}"
}