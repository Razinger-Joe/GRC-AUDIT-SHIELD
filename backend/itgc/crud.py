"""
CRUD operations for ITGC.
"""
from sqlalchemy.orm import Session
from typing import List, Optional
from .models import ITControl, ControlTest
from .schemas import ITControlCreate, ControlTestCreate


def get_controls(db: Session, skip: int = 0, limit: int = 100) -> List[ITControl]:
    """Get all IT controls."""
    return db.query(ITControl).offset(skip).limit(limit).all()


def get_control_by_id(db: Session, control_id: int) -> Optional[ITControl]:
    """Get control by ID."""
    return db.query(ITControl).filter(ITControl.id == control_id).first()


def create_control(db: Session, control: ITControlCreate) -> ITControl:
    """Create a new IT control."""
    db_control = ITControl(**control.model_dump())
    db.add(db_control)
    db.commit()
    db.refresh(db_control)
    return db_control


def create_test(db: Session, test: ControlTestCreate, user_id: int) -> ControlTest:
    """Create a new control test."""
    db_test = ControlTest(**test.model_dump(), user_id=user_id)
    db.add(db_test)
    db.commit()
    db.refresh(db_test)
    return db_test


def get_tests_by_control(db: Session, control_id: int) -> List[ControlTest]:
    """Get all tests for a control."""
    return db.query(ControlTest).filter(ControlTest.control_id == control_id).all()
