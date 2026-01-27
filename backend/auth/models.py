"""
User authentication models.
"""
from sqlalchemy import Column, String, Boolean, Enum as SQLEnum
from enum import Enum
from ..models.base import BaseModel


class UserRole(str, Enum):
    """User roles for role-based access control."""
    ADMIN = "admin"
    AUDITOR = "auditor"
    VIEWER = "viewer"


class User(BaseModel):
    """User model for authentication and authorization."""
    
    __tablename__ = "users"
    
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.VIEWER, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    
    def __repr__(self):
        return f"<User {self.email}>"
