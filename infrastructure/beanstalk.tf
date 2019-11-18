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