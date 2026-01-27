"""
Vulnerability management schemas.
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .models import VulnerabilitySeverity, RemediationStatus


class VulnerabilityBase(BaseModel):
    """Base vulnerability schema."""
    cve_id: Optional[str] = Field(None, max_length=50)
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    cvss_score: Optional[float] = Field(None, ge=0.0, le=10.0)
    severity: VulnerabilitySeverity
    affected_systems: Optional[str] = None
    asset_name: Optional[str] = None
    remediation_plan: Optional[str] = None
    target_date: Optional[str] = None
    assigned_to: Optional[str] = None
    references: Optional[str] = None
    notes: Optional[str] = None


class VulnerabilityCreate(VulnerabilityBase):
    """Schema for creating a vulnerability."""
    pass


class VulnerabilityUpdate(BaseModel):
    """Schema for updating a vulnerability."""
    status: Optional[RemediationStatus] = None
    remediation_plan: Optional[str] = None
    target_date: Optional[str] = None
    actual_remediation_date: Optional[str] = None
    assigned_to: Optional[str] = None
    notes: Optional[str] = None


class VulnerabilityResponse(VulnerabilityBase):
    """Schema for vulnerability response."""
    id: int
    status: RemediationStatus
    actual_remediation_date: Optional[str]
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class PatchBase(BaseModel):
    """Base patch schema."""
    patch_id: str = Field(..., max_length=100)
    patch_name: str = Field(..., max_length=255)
    vendor: Optional[str] = None
    release_date: Optional[str] = None
    installation_date: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None


class PatchCreate(PatchBase):
    """Schema for creating a patch."""
    vulnerability_id: int


class PatchResponse(PatchBase):
    """Schema for patch response."""
    id: int
    vulnerability_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
