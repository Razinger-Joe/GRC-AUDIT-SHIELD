"""
CRUD operations for risk assessment.
"""
from sqlalchemy.orm import Session
from typing import List, Optional
from .models import Risk, RiskMitigation
from .schemas import RiskCreate, RiskUpdate, MitigationCreate


def calculate_risk_score(likelihood: int, impact: int) -> float:
    """Calculate risk score from likelihood and impact."""
    return float(likelihood * impact)


def get_risks(db: Session, skip: int = 0, limit: int = 100) -> List[Risk]:
    """Get all risks."""
    return db.query(Risk).offset(skip).limit(limit).all()


def get_risk_by_id(db: Session, risk_id: int) -> Optional[Risk]:
    """Get risk by ID."""
    return db.query(Risk).filter(Risk.id == risk_id).first()


def create_risk(db: Session, risk: RiskCreate, user_id: int) -> Risk:
    """Create a new risk."""
    risk_score = calculate_risk_score(risk.likelihood, risk.impact)
    
    db_risk = Risk(
        **risk.model_dump(),
        risk_score=risk_score,
        user_id=user_id
    )
    db.add(db_risk)
    db.commit()
    db.refresh(db_risk)
    return db_risk


def update_risk(db: Session, risk_id: int, risk_update: RiskUpdate) -> Optional[Risk]:
    """Update a risk."""
    db_risk = get_risk_by_id(db, risk_id)
    
    if not db_risk:
        return None
    
    update_data = risk_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_risk, field, value)
    
    db.commit()
    db.refresh(db_risk)
    return db_risk


def create_mitigation(db: Session, mitigation: MitigationCreate) -> RiskMitigation:
    """Create a new mitigation."""
    db_mitigation = RiskMitigation(**mitigation.model_dump())
    db.add(db_mitigation)
    db.commit()
    db.refresh(db_mitigation)
    return db_mitigation


def get_mitigations_by_risk(db: Session, risk_id: int) -> List[RiskMitigation]:
    """Get all mitigations for a risk."""
    return db.query(RiskMitigation).filter(RiskMitigation.risk_id == risk_id).all()
