"""
Risk assessment models.
"""
from sqlalchemy import Column, String, Integer, ForeignKey, Text, Enum as SQLEnum, Float
from sqlalchemy.orm import relationship
from enum import Enum
from ..models.base import BaseModel


class RiskCategory(str, Enum):
    """Risk categories."""
    OPERATIONAL = "operational"
    FINANCIAL = "financial"
    COMPLIANCE = "compliance"
    STRATEGIC = "strategic"
    REPUTATIONAL = "reputational"
    TECHNOLOGY = "technology"


class RiskLevel(str, Enum):
    """Risk severity levels."""
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class TreatmentStatus(str, Enum):
    """Risk treatment status."""
    IDENTIFIED = "identified"
    ANALYZING = "analyzing"
    TREATING = "treating"
    MONITORING = "monitoring"
    CLOSED = "closed"


class Risk(BaseModel):
    """Risk assessment record."""
    
    __tablename__ = "risks"
    
    risk_id = Column(String(50), nullable=False, unique=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(SQLEnum(RiskCategory), nullable=False)
    
    # Risk analysis
    likelihood = Column(Integer, nullable=False)  # 1-5 scale
    impact = Column(Integer, nullable=False)  # 1-5 scale
    risk_score = Column(Float, nullable=False)  # likelihood * impact
    severity = Column(SQLEnum(RiskLevel), nullable=False)
    
    # Treatment
    status = Column(SQLEnum(TreatmentStatus), default=TreatmentStatus.IDENTIFIED, nullable=False)
    treatment_plan = Column(Text)
    owner = Column(String(255))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Relationships
    mitigations = relationship("RiskMitigation", back_populates="risk", cascade="all, delete-orphan")


class RiskMitigation(BaseModel):
    """Risk mitigation actions."""
    
    __tablename__ = "risk_mitigations"
    
    risk_id = Column(Integer, ForeignKey("risks.id"), nullable=False)
    action = Column(Text, nullable=False)
    responsible_party = Column(String(255))
    target_date = Column(String(50))  # ISO date string
    status = Column(String(50))
    notes = Column(Text)
    
    # Relationships
    risk = relationship("Risk", back_populates="mitigations")
