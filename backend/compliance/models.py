"""
Compliance management models.
"""
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, Enum as SQLEnum
from sqlalchemy.orm import relationship
from enum import Enum
from ..models.base import BaseModel


class ComplianceStatus(str, Enum):
    """Compliance status enum."""
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLIANT = "compliant"
    NON_COMPLIANT = "non_compliant"
    PARTIALLY_COMPLIANT = "partially_compliant"


class Framework(BaseModel):
    """Compliance framework model (SOC2, ISO27001, NIST, etc.)."""
    
    __tablename__ = "frameworks"
    
    name = Column(String(100), nullable=False, unique=True)
    code = Column(String(50), nullable=False, unique=True)
    description = Column(Text)
    version = Column(String(20))
    
    # Relationships
    requirements = relationship("FrameworkRequirement", back_populates="framework", cascade="all, delete-orphan")
    assessments = relationship("ComplianceAssessment", back_populates="framework")


class FrameworkRequirement(BaseModel):
    """Individual requirements within a compliance framework."""
    
    __tablename__ = "framework_requirements"
    
    framework_id = Column(Integer, ForeignKey("frameworks.id"), nullable=False)
    requirement_id = Column(String(50), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(String(100))
    
    # Relationships
    framework = relationship("Framework", back_populates="requirements")


class ComplianceAssessment(BaseModel):
    """Compliance assessment for a specific framework."""
    
    __tablename__ = "compliance_assessments"
    
    framework_id = Column(Integer, ForeignKey("frameworks.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(SQLEnum(ComplianceStatus), default=ComplianceStatus.NOT_STARTED, nullable=False)
    progress_percentage = Column(Float, default=0.0)
    notes = Column(Text)
    
    # Relationships
    framework = relationship("Framework", back_populates="assessments")
