"""
Vulnerability management API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..auth.dependencies import get_current_user, require_auditor
from ..auth.models import User
from . import schemas, crud
from .models import RemediationStatus

router = APIRouter(prefix="/api/vulnerabilities", tags=["Vulnerability Management"])


@router.get("/", response_model=List[schemas.VulnerabilityResponse])
async def list_vulnerabilities(
    skip: int = 0,
    limit: int = 100,
    status_filter: Optional[RemediationStatus] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all vulnerabilities."""
    query = db.query(crud.Vulnerability)
    
    if status_filter:
        query = query.filter(crud.Vulnerability.status == status_filter)
    
    vulnerabilities = query.offset(skip).limit(limit).all()
    return vulnerabilities


@router.get("/{vuln_id}", response_model=schemas.VulnerabilityResponse)
async def get_vulnerability(
    vuln_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific vulnerability."""
    vuln = crud.get_vulnerability_by_id(db, vuln_id)
    if not vuln:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vulnerability not found"
        )
    return vuln


@router.post("/", response_model=schemas.VulnerabilityResponse, status_code=status.HTTP_201_CREATED)
async def create_vulnerability(
    vuln: schemas.VulnerabilityCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new vulnerability."""
    return crud.create_vulnerability(db, vuln, current_user.id)


@router.patch("/{vuln_id}", response_model=schemas.VulnerabilityResponse)
async def update_vulnerability(
    vuln_id: int,
    vuln_update: schemas.VulnerabilityUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a vulnerability."""
    vuln = crud.get_vulnerability_by_id(db, vuln_id)
    
    if not vuln:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vulnerability not found"
        )
    
    updated = crud.update_vulnerability(db, vuln_id, vuln_update)
    return updated


@router.post("/patches", response_model=schemas.PatchResponse, status_code=status.HTTP_201_CREATED)
async def create_patch(
    patch: schemas.PatchCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_auditor)
):
    """Create a new patch record."""
    # Verify vulnerability exists
    vuln = crud.get_vulnerability_by_id(db, patch.vulnerability_id)
    if not vuln:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vulnerability not found"
        )
    
    return crud.create_patch(db, patch)


@router.get("/{vuln_id}/patches", response_model=List[schemas.PatchResponse])
async def get_vulnerability_patches(
    vuln_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all patches for a specific vulnerability."""
    patches = crud.get_patches_by_vulnerability(db, vuln_id)
    return patches
