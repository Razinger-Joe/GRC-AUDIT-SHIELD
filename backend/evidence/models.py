"""
Evidence management models.
"""
from sqlalchemy import Column, String, Integer, ForeignKey, Text, BigInteger
from sqlalchemy.orm import relationship
from ..models.base import BaseModel


class Evidence(BaseModel):
    """Evidence file record."""
    
    __tablename__ = "evidence"
    
    title = Column(String(255), nullable=False)
    description = Column(Text)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)  # Local path or S3 key
    file_size = Column(BigInteger)  # Size in bytes
    file_type = Column(String(100))  # MIME type
    
    # Categorization
    category = Column(String(100))  # control_evidence, audit_evidence, compliance_evidence
    tags = Column(Text)  # JSON array or comma-separated
    
    # Relationships
    related_control_id = Column(Integer, ForeignKey("it_controls.id"), nullable=True)
    related_risk_id = Column(Integer, ForeignKey("risks.id"), nullable=True)
    related_framework_id = Column(Integer, ForeignKey("frameworks.id"), nullable=True)
    
    # Upload info
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    version = Column(Integer, default=1)
    
    # Metadata
    notes = Column(Text)
