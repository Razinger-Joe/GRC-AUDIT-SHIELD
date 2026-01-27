"""
CRUD operations for compliance management.
"""
from sqlalchemy.orm import Session
from typing import List, Optional
from .models import Framework, FrameworkRequirement, ComplianceAssessment
from .schemas import FrameworkCreate, RequirementCreate, AssessmentCreate, AssessmentUpdate


def get_frameworks(db: Session, skip: int = 0, limit: int = 100) -> List[Framework]:
    """Get all frameworks."""
    return db.query(Framework).offset(skip).limit(limit).all()


def get_framework_by_id(db: Session, framework_id: int) -> Optional[Framework]:
    """Get framework by ID."""
    return db.query(Framework).filter(Framework.id == framework_id).first()


def get_framework_by_code(db: Session, code: str) -> Optional[Framework]:
    """Get framework by code."""
    return db.query(Framework).filter(Framework.code == code).first()


def create_framework(db: Session, framework: FrameworkCreate) -> Framework:
    """Create a new framework."""
    db_framework = Framework(**framework.model_dump())
    db.add(db_framework)
    db.commit()
    db.refresh(db_framework)
    return db_framework


def create_requirement(db: Session, requirement: RequirementCreate) -> FrameworkRequirement:
    """Create a new requirement."""
    db_requirement = FrameworkRequirement(**requirement.model_dump())
    db.add(db_requirement)
    db.commit()
    db.refresh(db_requirement)
    return db_requirement


def get_requirements_by_framework(db: Session, framework_id: int) -> List[FrameworkRequirement]:
    """Get all requirements for a framework."""
    return db.query(FrameworkRequirement).filter(
        FrameworkRequirement.framework_id == framework_id
    ).all()


def create_assessment(db: Session, assessment: AssessmentCreate, user_id: int) -> ComplianceAssessment:
    """Create a new assessment."""
    db_assessment = ComplianceAssessment(
        **assessment.model_dump(),
        user_id=user_id
    )
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment


def get_assessments_by_user(db: Session, user_id: int) -> List[ComplianceAssessment]:
    """Get all assessments for a user."""
    return db.query(ComplianceAssessment).filter(
        ComplianceAssessment.user_id == user_id
    ).all()


def get_assessment_by_id(db: Session, assessment_id: int) -> Optional[ComplianceAssessment]:
    """Get assessment by ID."""
    return db.query(ComplianceAssessment).filter(ComplianceAssessment.id == assessment_id).first()


def update_assessment(
    db: Session, 
    assessment_id: int, 
    assessment_update: AssessmentUpdate
) -> Optional[ComplianceAssessment]:
    """Update an assessment."""
    db_assessment = get_assessment_by_id(db, assessment_id)
    
    if not db_assessment:
        return None
    
    update_data = assessment_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_assessment, field, value)
    
    db.commit()
    db.refresh(db_assessment)
    return db_assessment
