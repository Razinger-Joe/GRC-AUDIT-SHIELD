"""
Vulnerability management models.
"""
from sqlalchemy import Column, String, Integer, ForeignKey, Text, Enum as SQLEnum, Float
from sqlalchemy.orm import relationship
from enum import Enum
from ..models.base import BaseModel


class VulnerabilitySeverity(str, Enum):
    """CVSS-based severity levels."""
    CRITICAL = "critical"  # 9.0-10.0
    HIGH = "high"  # 7.0-8.9
    MEDIUM = "medium"  # 4.0-6.9
    LOW = "low"  # 0.1-3.9
    NONE = "none"  # 0.0


class RemediationStatus(str, Enum):
    """Remediation status."""
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    REMEDIATED = "remediated"
    ACCEPTED = "accepted"
    FALSE_POSITIVE = "false_positive"


class Vulnerability(BaseModel):
    """Vulnerability record."""
    
    __tablename__ = "vulnerabilities"
    
    cve_id = Column(String(50), unique=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    
    # CVSS Scoring
    cvss_score = Column(Float)  # 0.0-10.0
    severity = Column(SQLEnum(VulnerabilitySeverity), nullable=False)
    
    # Affected systems
    affected_systems = Column(Text)  # JSON or comma-separated
    asset_name = Column(String(255))
    
    # Remediation
    status = Column(SQLEnum(RemediationStatus), default=RemediationStatus.OPEN, nullable=False)
    remediation_plan = Column(Text)
    target_date = Column(String(50))  # ISO date string
    actual_remediation_date = Column(String(50))
    
    # Assignment
    assigned_to = Column(String(255))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # References
    references = Column(Text)  # URLs or documentation
    notes = Column(Text)


class PatchRecord(BaseModel):
    """Patch management record."""
    
    __tablename__ = "patch_records"
    
    vulnerability_id = Column(Integer, ForeignKey("vulnerabilities.id"))
    patch_id = Column(String(100), nullable=False)
    patch_name = Column(String(255), nullable=False)
    vendor = Column(String(255))
    release_date = Column(String(50))
    installation_date = Column(String(50))
    status = Column(String(50))
    notes = Column(Text)
    
    # Relationships
    vulnerability = relationship("Vulnerability", backref="patches")
