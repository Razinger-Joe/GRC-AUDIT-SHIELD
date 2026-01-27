"""
Audit trail API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from ..database import get_db
from ..auth.dependencies import get_current_user
from ..auth.models import User
from .models import AuditLog

router = APIRouter(prefix="/api/audit", tags=["Audit Trail"])


async def log_action(
    db: Session,
    user_id: int,
    action: str,
    entity_type: Optional[str] = None,
    entity_id: Optional[int] = None,
    changes: Optional[dict] = None,
    description: Optional[str] = None,
    severity: str = "info",
    request: Optional[Request] = None
):
    """
    Log an action to the audit trail.
    
    This is a utility function that can be called from other modules.
    """
    log_entry = AuditLog(
        user_id=user_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        changes=changes,
        description=description,
        severity=severity,
        ip_address=request.client.host if request else None,
        user_agent=request.headers.get("user-agent") if request else None
    )
    
    db.add(log_entry)
    db.commit()
    return log_entry


@router.get("/logs", response_model=List[dict])
async def get_audit_logs(
    skip: int = 0,
    limit: int = 100,
    action: Optional[str] = None,
    entity_type: Optional[str] = None,
    user_id: Optional[int] = None,
    days: Optional[int] = 30,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get audit logs with filters."""
    query = db.query(AuditLog)
    
    # Filter by date range
    if days:
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        query = query.filter(AuditLog.created_at >= cutoff_date)
    
    # Apply filters
    if action:
        query = query.filter(AuditLog.action == action)
    if entity_type:
        query = query.filter(AuditLog.entity_type == entity_type)
    if user_id:
        query = query.filter(AuditLog.user_id == user_id)
    
    # Order by most recent first
    query = query.order_by(AuditLog.created_at.desc())
    
    logs = query.offset(skip).limit(limit).all()
    
    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "action": log.action,
            "entity_type": log.entity_type,
            "entity_id": log.entity_id,
            "changes": log.changes,
            "description": log.description,
            "severity": log.severity,
            "ip_address": log.ip_address,
            "created_at": log.created_at.isoformat() if log.created_at else None
        }
        for log in logs
    ]


@router.get("/user/{user_id}/activity", response_model=List[dict])
async def get_user_activity(
    user_id: int,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get activity for a specific user."""
    # Users can only view their own activity unless they're admin
    from ..auth.models import UserRole
    if current_user.role != UserRole.ADMIN and current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this user's activity"
        )
    
    logs = db.query(AuditLog).filter(
        AuditLog.user_id == user_id
    ).order_by(AuditLog.created_at.desc()).offset(skip).limit(limit).all()
    
    return [
        {
            "id": log.id,
            "action": log.action,
            "entity_type": log.entity_type,
            "entity_id": log.entity_id,
            "description": log.description,
            "created_at": log.created_at.isoformat() if log.created_at else None
        }
        for log in logs
    ]
