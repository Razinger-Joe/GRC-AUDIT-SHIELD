"""
Compliance management API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..auth.dependencies import get_current_user, require_auditor
from ..auth.models import User
from . import schemas, crud

router = APIRouter(prefix="/api/compliance", tags=["Compliance"])


@router.get("/frameworks", response_model=List[schemas.FrameworkResponse])
async def list_frameworks(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all compliance frameworks."""
    frameworks = crud.get_frameworks(db, skip=skip, limit=limit)
    return frameworks


@router.get("/frameworks/{framework_id}", response_model=schemas.FrameworkWithRequirements)
async def get_framework(
    framework_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific framework with its requirements."""
    framework = crud.get_framework_by_id(db, framework_id)
    if not framework:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Framework not found"
        )
    return framework


@router.post("/frameworks", response_model=schemas.FrameworkResponse, status_code=status.HTTP_201_CREATED)
async def create_framework(
    framework: schemas.FrameworkCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_auditor)
):
    """Create a new compliance framework."""
    # Check if framework already exists
    existing = crud.get_framework_by_code(db, framework.code)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Framework with this code already exists"
        )
    
    return crud.create_framework(db, framework)


@router.post("/requirements", response_model=schemas.RequirementResponse, status_code=status.HTTP_201_CREATED)
async def create_requirement(
    requirement: schemas.RequirementCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_auditor)
):
    """Create a new requirement for a framework."""
    # Verify framework exists
    framework = crud.get_framework_by_id(db, requirement.framework_id)
    if not framework:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Framework not found"
        )
    
    return crud.create_requirement(db, requirement)


@router.get("/assessments", response_model=List[schemas.AssessmentResponse])
async def list_assessments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all assessments for the current user."""
    assessments = crud.get_assessments_by_user(db, current_user.id)
    return assessments


@router.post("/assessments", response_model=schemas.AssessmentResponse, status_code=status.HTTP_201_CREATED)
async def create_assessment(
    assessment: schemas.AssessmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new compliance assessment."""
    # Verify framework exists
    framework = crud.get_framework_by_id(db, assessment.framework_id)
    if not framework:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Framework not found"
        )
    
    return crud.create_assessment(db, assessment, current_user.id)


@router.patch("/assessments/{assessment_id}", response_model=schemas.AssessmentResponse)
async def update_assessment(
    assessment_id: int,
    assessment_update: schemas.AssessmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an assessment."""
    # Get assessment
    assessment = crud.get_assessment_by_id(db, assessment_id)
    
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found"
        )
    
    # Check ownership
    if assessment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this assessment"
        )
    
    updated = crud.update_assessment(db, assessment_id, assessment_update)
    return updated
