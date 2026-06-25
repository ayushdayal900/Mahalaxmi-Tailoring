# 🚀 Mahalaxmi Tailors - Frontend Deployment Script
# Run this locally in PowerShell
# Usage: .\deploy_frontend.ps1

# --- CONFIGURATION ---
$BucketName = "mahalaxmi-frontend-prod" # 👈 REPLACE with your actual bucket name
$DistributionId = "" # 👈 REPLACE with your CloudFront Distribution ID (Optional, for cache clearing)
$Region = "ap-south-1" 
# ---------------------

Write-Host "🎨 Starting Frontend Deployment..." -ForegroundColor Cyan

# 1. Verification
if (-not (Test-Path "package.json")) {
    Write-Error "ERROR:  package.json not found! Are you in the 'frontend' directory?"
    exit 1
}

# 2. Build
Write-Host "🔨 Building React App..." -ForegroundColor Yellow
npm install
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "ERROR:  Build Failed!"
    exit 1
}

# 3. Check for AWS CLI
if (Get-Command "aws" -ErrorAction SilentlyContinue) {
    Write-Host "☁️ AWS CLI detected. Attempting upload..." -ForegroundColor Green
    
    # Upload to S3
    Write-Host "⬆️ Uploading to S3 ($BucketName)..." -ForegroundColor Yellow
    aws s3 sync dist/ s3://$BucketName --delete --region $Region

    # Invalidate CloudFront
    if ($DistributionId) {
        Write-Host "🔄 Invalidating CloudFront Cache..." -ForegroundColor Yellow
        aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
    } else {
        Write-Host "⚠️ No Distribution ID provided. Skipping cache invalidation." -ForegroundColor Gray
    }
} else {
    Write-Host "⚠️ AWS CLI not found." -ForegroundColor Magenta
    Write-Host "👉 Setup Complete! The 'dist' folder is ready."
    Write-Host "   Please manually upload the contents of the 'dist' folder to your S3 bucket: $BucketName"
}

Write-Host "DONE:  Deployment Script Finished!" -ForegroundColor Green
