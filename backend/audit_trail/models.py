"""
Audit trail model for tracking all system changes.
"""
from sqlalchemy import Column, String, Integer, ForeignKey, Text, JSON
from ..models.base import BaseModel


class AuditLog(BaseModel):
    """Audit log entry."""
    
    __tablename__ = "audit_logs"
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action = Column(String(100), nullable=False)  # CREATE, UPDATE, DELETE, LOGIN, etc.
    entity_type = Column(String(100))  # User, Risk, Control, etc.
    entity_id = Column(Integer)
    
    # Change details
    changes = Column(JSON)  # Store old and new values
    ip_address = Column(String(45))  # IPv4 or IPv6
    user_agent = Column(String(500))
    
    # Additional context
    description = Column(Text)
    severity = Column(String(20))  # info, warning, critical
