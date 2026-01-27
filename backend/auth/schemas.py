"""
Pydantic schemas for authentication.
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from .models import UserRole


class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    full_name: str = Field(..., min_length=1, max_length=255)


class UserCreate(UserBase):
    """Schema for user registration."""
    password: str = Field(..., min_length=8, max_length=100)


class UserLogin(BaseModel):
    """Schema for user login."""
    email: EmailStr
    password: str


class UserResponse(UserBase):
    """Schema for user response."""
    id: int
    role: UserRole
    is_active: bool
    is_verified: bool
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    """Schema for JWT token response."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Schema for token data."""
    user_id: Optional[int] = None
    email: Optional[str] = None
    role: Optional[UserRole] = None


class RefreshToken(BaseModel):
    """Schema for refresh token request."""
    refresh_token: str
