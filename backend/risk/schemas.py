"""
Risk assessment schemas.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from .models import RiskCategory, RiskLevel, TreatmentStatus


class RiskBase(BaseModel):
    """Base risk schema."""
    risk_id: str = Field(..., max_length=50)
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    category: RiskCategory
    likelihood: int = Field(..., ge=1, le=5)
    impact: int = Field(..., ge=1, le=5)
    severity: RiskLevel
    treatment_plan: Optional[str] = None
    owner: Optional[str] = None


class RiskCreate(RiskBase):
    """Schema for creating a risk."""
    pass


class RiskUpdate(BaseModel):
    """Schema for updating a risk."""
    status: Optional[TreatmentStatus] = None
    treatment_plan: Optional[str] = None
    owner: Optional[str] = None


class RiskResponse(RiskBase):
    """Schema for risk response."""
    id: int
    risk_score: float
    status: TreatmentStatus
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class MitigationBase(BaseModel):
    """Base mitigation schema."""
    action: str
    responsible_party: Optional[str] = None
    target_date: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None


class MitigationCreate(MitigationBase):
    """Schema for creating a mitigation."""
    risk_id: int


class MitigationResponse(MitigationBase):
    """Schema for mitigation response."""
    id: int
    risk_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class RiskWithMitigations(RiskResponse):
    """Risk with its mitigations."""
    mitigations: List[MitigationResponse] = []
