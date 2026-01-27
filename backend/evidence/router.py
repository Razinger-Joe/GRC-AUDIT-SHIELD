"""
Evidence management API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..auth.dependencies import get_current_user
from ..auth.models import User
from ..utils.file_storage import file_storage
from .models import Evidence

router = APIRouter(prefix="/api/evidence", tags=["Evidence Management"])


@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_evidence(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: Optional[str] = Form(None),
    category: str = Form("general"),
    related_control_id: Optional[int] = Form(None),
    related_risk_id: Optional[int] = Form(None),
    related_framework_id: Optional[int] = Form(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Upload evidence file."""
    # Validate file extension
    from ..config import settings
    from pathlib import Path
    
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type not allowed. Allowed types: {', '.join(settings.ALLOWED_EXTENSIONS)}"
        )
    
    # Check file size
    content = await file.read()
    await file.seek(0)  # Reset file pointer
    
    max_size = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024  # Convert MB to bytes
    if len(content) > max_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File too large. Maximum size: {settings.MAX_UPLOAD_SIZE_MB}MB"
        )
    
    # Save file
    file_data = await file_storage.save_file(file, category)
    
    # Create evidence record
    evidence = Evidence(
        title=title,
        description=description,
        file_name=file_data["original_filename"],
        file_path=file_data["file_path"],
        file_size=file_data["file_size"],
        file_type=file_data["content_type"],
        category=category,
        related_control_id=related_control_id,
        related_risk_id=related_risk_id,
        related_framework_id=related_framework_id,
        uploaded_by=current_user.id
    )
    
    db.add(evidence)
    db.commit()
    db.refresh(evidence)
    
    return {
        "id": evidence.id,
        "title": evidence.title,
        "file_name": evidence.file_name,
        "file_size": evidence.file_size,
        "message": "Evidence uploaded successfully"
    }


@router.get("/", response_model=List[dict])
async def list_evidence(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all evidence."""
    query = db.query(Evidence)
    
    if category:
        query = query.filter(Evidence.category == category)
    
    evidence_list = query.offset(skip).limit(limit).all()
    
    return [
        {
            "id": e.id,
            "title": e.title,
            "description": e.description,
            "file_name": e.file_name,
            "file_size": e.file_size,
            "file_type": e.file_type,
            "category": e.category,
            "created_at": e.created_at.isoformat() if e.created_at else None
        }
        for e in evidence_list
    ]


@router.delete("/{evidence_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_evidence(
    evidence_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete evidence."""
    evidence = db.query(Evidence).filter(Evidence.id == evidence_id).first()
    
    if not evidence:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evidence not found"
        )
    
    # Check ownership (admins and auditors can delete any, users only their own)
    from ..auth.models import UserRole
    if current_user.role == UserRole.VIEWER and evidence.uploaded_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this evidence"
        )
    
    # Delete file from storage
    file_storage.delete_file(evidence.file_path)
    
    # Delete database record
    db.delete(evidence)
    db.commit()
    
    return None
