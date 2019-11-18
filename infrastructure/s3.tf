resource "aws_s3_bucket" "deployment" {
    bucket  = "${var.ORG_NAME}-${var.FUNCTION}-${var.ENV}-${var.REGION}"
    acl     = "private"

    tags {
        environment     = "${var.ENVIRONMENT}"
    }
}