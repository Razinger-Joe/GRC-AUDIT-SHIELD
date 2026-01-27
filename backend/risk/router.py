"""
Risk assessment API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..auth.dependencies import get_current_user, require_auditor
from ..auth.models import User
from . import schemas, crud

router = APIRouter(prefix="/api/risks", tags=["Risk Assessment"])


@router.get("/", response_model=List[schemas.RiskResponse])
async def list_risks(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all risks."""
    risks = crud.get_risks(db, skip=skip, limit=limit)
    return risks


@router.get("/{risk_id}", response_model=schemas.RiskWithMitigations)
async def get_risk(
    risk_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific risk with mitigations."""
    risk = crud.get_risk_by_id(db, risk_id)
    if not risk:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Risk not found"
        )
    return risk


@router.post("/", response_model=schemas.RiskResponse, status_code=status.HTTP_201_CREATED)
async def create_risk(
    risk: schemas.RiskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new risk."""
    return crud.create_risk(db, risk, current_user.id)


@router.patch("/{risk_id}", response_model=schemas.RiskResponse)
async def update_risk(
    risk_id: int,
    risk_update: schemas.RiskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a risk."""
    risk = crud.get_risk_by_id(db, risk_id)
    
    if not risk:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Risk not found"
        )
    
    # Check ownership
    if risk.user_id != current_user.id:
        from ..auth.models import UserRole
        if current_user.role not in [UserRole.ADMIN, UserRole.AUDITOR]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this risk"
            )
    
    updated = crud.update_risk(db, risk_id, risk_update)
    return updated


@router.post("/mitigations", response_model=schemas.MitigationResponse, status_code=status.HTTP_201_CREATED)
async def create_mitigation(
    mitigation: schemas.MitigationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new mitigation action."""
    # Verify risk exists
    risk = crud.get_risk_by_id(db, mitigation.risk_id)
    if not risk:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Risk not found"
        )
    
    return crud.create_mitigation(db, mitigation)


@router.get("/{risk_id}/mitigations", response_model=List[schemas.MitigationResponse])
async def get_risk_mitigations(
    risk_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all mitigations for a specific risk."""
    mitigations = crud.get_mitigations_by_risk(db, risk_id)
    return mitigations
