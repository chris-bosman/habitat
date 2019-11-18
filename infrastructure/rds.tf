resource "aws_db_instance" "deployment" {
    allocated_storage           = 20
    allow_major_version_upgrade = true
    auto_minor_version_upgrade  = true
    backup_retention_period     = 7
    backup_window               = "04:00-06:00"
    copy_tags_to_snapshot       = true
    
}