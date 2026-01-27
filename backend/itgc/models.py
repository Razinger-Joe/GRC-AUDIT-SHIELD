"""
IT General Controls (ITGC) models.
"""
from sqlalchemy import Column, String, Integer, ForeignKey, Text, Enum as SQLEnum, Boolean
from sqlalchemy.orm import relationship
from enum import Enum
from ..models.base import BaseModel


class ControlCategory(str, Enum):
    """ITGC control categories."""
    ACCESS_CONTROL = "access_control"
    CHANGE_MANAGEMENT = "change_management"
    OPERATIONS = "operations"
    BACKUP_RECOVERY = "backup_recovery"
    SECURITY = "security"


class TestResult(str, Enum):
    """Test result status."""
    PASSED = "passed"
    FAILED = "failed"
    PARTIALLY_PASSED = "partially_passed"
    NOT_TESTED = "not_tested"


class ITControl(BaseModel):
    """IT General Control."""
    
    __tablename__ = "it_controls"
    
    control_id = Column(String(50), nullable=False, unique=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(SQLEnum(ControlCategory), nullable=False)
    owner = Column(String(255))
    is_automated = Column(Boolean, default=False)
    
    # Relationships
    tests = relationship("ControlTest", back_populates="control", cascade="all, delete-orphan")


class ControlTest(BaseModel):
    """Control testing record."""
    
    __tablename__ = "control_tests"
    
    control_id = Column(Integer, ForeignKey("it_controls.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    test_date = Column(String(50))  # Store as ISO string
    result = Column(SQLEnum(TestResult), nullable=False)
    notes = Column(Text)
    evidence = Column(Text)  # File paths or references
    deficiencies = Column(Text)
    
    # Relationships
    control = relationship("ITControl", back_populates="tests")
