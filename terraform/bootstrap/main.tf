resource "random_id" "suffix" {
  byte_length = 4
}

resource "aws_s3_bucket" "state" {
  bucket = "opscontrol-tfstate-${random_id.suffix.hex}"
  
  lifecycle {
    prevent_destroy = true 
  }
}

resource "aws_s3_bucket_versioning" "v" {
  bucket = aws_s3_bucket.state.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_dynamodb_table" "lock" {
  name         = "opscontrol-lock-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute { name = "LockID"; type = "S" }
}