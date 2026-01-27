"""
CRUD operations for vulnerability management.
"""
from sqlalchemy.orm import Session
from typing import List, Optional
from .models import Vulnerability, PatchRecord
from .schemas import VulnerabilityCreate, VulnerabilityUpdate, PatchCreate


def get_vulnerabilities(db: Session, skip: int = 0, limit: int = 100) -> List[Vulnerability]:
    """Get all vulnerabilities."""
    return db.query(Vulnerability).offset(skip).limit(limit).all()


def get_vulnerability_by_id(db: Session, vuln_id: int) -> Optional[Vulnerability]:
    """Get vulnerability by ID."""
    return db.query(Vulnerability).filter(Vulnerability.id == vuln_id).first()


def create_vulnerability(db: Session, vuln: VulnerabilityCreate, user_id: int) -> Vulnerability:
    """Create a new vulnerability."""
    db_vuln = Vulnerability(**vuln.model_dump(), user_id=user_id)
    db.add(db_vuln)
    db.commit()
    db.refresh(db_vuln)
    return db_vuln


def update_vulnerability(
    db: Session, 
    vuln_id: int, 
    vuln_update: VulnerabilityUpdate
) -> Optional[Vulnerability]:
    """Update a vulnerability."""
    db_vuln = get_vulnerability_by_id(db, vuln_id)
    
    if not db_vuln:
        return None
    
    update_data = vuln_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_vuln, field, value)
    
    db.commit()
    db.refresh(db_vuln)
    return db_vuln


def create_patch(db: Session, patch: PatchCreate) -> PatchRecord:
    """Create a new patch record."""
    db_patch = PatchRecord(**patch.model_dump())
    db.add(db_patch)
    db.commit()
    db.refresh(db_patch)
    return db_patch


def get_patches_by_vulnerability(db: Session, vuln_id: int) -> List[PatchRecord]:
    """Get all patches for a vulnerability."""
    return db.query(PatchRecord).filter(PatchRecord.vulnerability_id == vuln_id).all()
