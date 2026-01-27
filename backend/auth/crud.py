"""
CRUD operations for user management.
"""
from sqlalchemy.orm import Session
from typing import Optional
from .models import User
from .schemas import UserCreate
from .utils import get_password_hash


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get user by email address."""
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Get user by ID."""
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user_data: UserCreate) -> User:
    """
    Create a new user.
    
    Args:
        db: Database session
        user_data: User creation data
        
    Returns:
        Created user
    """
    hashed_password = get_password_hash(user_data.password)
    
    db_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        full_name=user_data.full_name
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """
    Authenticate a user with email and password.
    
    Args:
        db: Database session
        email: User email
        password: User password
        
    Returns:
        User if authentication successful, None otherwise
    """
    from .utils import verify_password
    
    user = get_user_by_email(db, email)
    
    if not user:
        return None
        
    if not verify_password(password, user.hashed_password):
        return None
    
    return user
