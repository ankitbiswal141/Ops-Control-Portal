output "terraform_state_bucket" {
  description = "The name of the S3 bucket created for remote state"
  value       = aws_s3_bucket.state.bucket
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.lock.name
}