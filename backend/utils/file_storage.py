"""
File storage utilities supporting both local filesystem and AWS S3.
"""
import os
import uuid
from pathlib import Path
from typing import BinaryIO, Optional
from fastapi import UploadFile
from ..config import settings


class FileStorage:
    """File storage handler with support for local and S3 storage."""
    
    def __init__(self):
        self.storage_type = settings.STORAGE_TYPE
        
        if self.storage_type == "local":
            # Create upload directory if it doesn't exist
            Path(settings.UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
        elif self.storage_type == "s3":
            # Initialize S3 client
            import boto3
            self.s3_client = boto3.client(
                's3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_REGION
            )
    
    async def save_file(self, file: UploadFile, category: str = "general") -> dict:
        """
        Save an uploaded file.
        
        Args:
            file: Uploaded file
            category: File category for organization
            
        Returns:
            Dictionary with file metadata
        """
        # Generate unique filename
        file_extension = Path(file.filename).suffix
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        
        if self.storage_type == "local":
            return await self._save_local(file, unique_filename, category)
        elif self.storage_type == "s3":
            return await self._save_s3(file, unique_filename, category)
        
        raise ValueError(f"Unsupported storage type: {self.storage_type}")
    
    async def _save_local(self, file: UploadFile, filename: str, category: str) -> dict:
        """Save file to local filesystem."""
        # Create category subdirectory
        category_dir = Path(settings.UPLOAD_DIR) / category
        category_dir.mkdir(parents=True, exist_ok=True)
        
        file_path = category_dir / filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        return {
            "filename": filename,
            "original_filename": file.filename,
            "file_path": str(file_path),
            "file_size": len(content),
            "content_type": file.content_type,
            "storage_type": "local"
        }
    
    async def _save_s3(self, file: UploadFile, filename: str, category: str) -> dict:
        """Save file to AWS S3."""
        # S3 key with category prefix
        s3_key = f"{category}/{filename}"
        
        # Upload to S3
        content = await file.read()
        self.s3_client.put_object(
            Bucket=settings.S3_BUCKET_NAME,
            Key=s3_key,
            Body=content,
            ContentType=file.content_type or 'application/octet-stream'
        )
        
        # Generate URL
        url = f"https://{settings.S3_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{s3_key}"
        
        return {
            "filename": filename,
            "original_filename": file.filename,
            "file_path": s3_key,
            "file_size": len(content),
            "content_type": file.content_type,
            "storage_type": "s3",
            "url": url
        }
    
    def delete_file(self, file_path: str) -> bool:
        """
        Delete a file.
        
        Args:
            file_path: Path or S3 key of the file
            
        Returns:
            True if successful
        """
        if self.storage_type == "local":
            try:
                Path(file_path).unlink(missing_ok=True)
                return True
            except Exception:
                return False
        elif self.storage_type == "s3":
            try:
                self.s3_client.delete_object(
                    Bucket=settings.S3_BUCKET_NAME,
                    Key=file_path
                )
                return True
            except Exception:
                return False
        
        return False


# Global storage instance
file_storage = FileStorage()
