"""
ITGC API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..auth.dependencies import get_current_user, require_auditor
from ..auth.models import User
from . import schemas, crud

router = APIRouter(prefix="/api/itgc", tags=["IT General Controls"])


@router.get("/controls", response_model=List[schemas.ITControlResponse])
async def list_controls(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all IT controls."""
    controls = crud.get_controls(db, skip=skip, limit=limit)
    return controls


@router.get("/controls/{control_id}", response_model=schemas.ITControlResponse)
async def get_control(
    control_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific IT control."""
    control = crud.get_control_by_id(db, control_id)
    if not control:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Control not found"
        )
    return control


@router.post("/controls", response_model=schemas.ITControlResponse, status_code=status.HTTP_201_CREATED)
async def create_control(
    control: schemas.ITControlCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_auditor)
):
    """Create a new IT control."""
    return crud.create_control(db, control)


@router.post("/tests", response_model=schemas.ControlTestResponse, status_code=status.HTTP_201_CREATED)
async def create_test(
    test: schemas.ControlTestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new control test."""
    # Verify control exists
    control = crud.get_control_by_id(db, test.control_id)
    if not control:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Control not found"
        )
    
    return crud.create_test(db, test, current_user.id)


@router.get("/controls/{control_id}/tests", response_model=List[schemas.ControlTestResponse])
async def get_control_tests(
    control_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all tests for a specific control."""
    tests = crud.get_tests_by_control(db, control_id)
    return tests
