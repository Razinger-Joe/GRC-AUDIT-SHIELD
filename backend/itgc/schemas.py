"""
ITGC schemas for API.
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .models import ControlCategory, TestResult


class ITControlBase(BaseModel):
    """Base IT control schema."""
    control_id: str = Field(..., max_length=50)
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    category: ControlCategory
    owner: Optional[str] = None
    is_automated: bool = False


class ITControlCreate(ITControlBase):
    """Schema for creating a control."""
    pass


class ITControlResponse(ITControlBase):
    """Schema for control response."""
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class ControlTestBase(BaseModel):
    """Base control test schema."""
    control_id: int
    test_date: str
    result: TestResult
    notes: Optional[str] = None
    evidence: Optional[str] = None
    deficiencies: Optional[str] = None


class ControlTestCreate(ControlTestBase):
    """Schema for creating a test."""
    pass


class ControlTestResponse(ControlTestBase):
    """Schema for test response."""
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
