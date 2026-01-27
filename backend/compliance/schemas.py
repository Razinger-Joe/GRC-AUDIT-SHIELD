"""
Pydantic schemas for compliance management.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from .models import ComplianceStatus


class FrameworkBase(BaseModel):
    """Base framework schema."""
    name: str = Field(..., max_length=100)
    code: str = Field(..., max_length=50)
    description: Optional[str] = None
    version: Optional[str] = None


class FrameworkCreate(FrameworkBase):
    """Schema for creating a framework."""
    pass


class FrameworkResponse(FrameworkBase):
    """Schema for framework response."""
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class RequirementBase(BaseModel):
    """Base requirement schema."""
    requirement_id: str = Field(..., max_length=50)
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    category: Optional[str] = None


class RequirementCreate(RequirementBase):
    """Schema for creating a requirement."""
    framework_id: int


class RequirementResponse(RequirementBase):
    """Schema for requirement response."""
    id: int
    framework_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class AssessmentBase(BaseModel):
    """Base assessment schema."""
    framework_id: int
    status: ComplianceStatus = ComplianceStatus.NOT_STARTED
    progress_percentage: float = Field(0.0, ge=0.0, le=100.0)
    notes: Optional[str] = None


class AssessmentCreate(AssessmentBase):
    """Schema for creating an assessment."""
    pass


class AssessmentUpdate(BaseModel):
    """Schema for updating an assessment."""
    status: Optional[ComplianceStatus] = None
    progress_percentage: Optional[float] = Field(None, ge=0.0, le=100.0)
    notes: Optional[str] = None


class AssessmentResponse(AssessmentBase):
    """Schema for assessment response."""
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class FrameworkWithRequirements(FrameworkResponse):
    """Framework with its requirements."""
    requirements: List[RequirementResponse] = []
