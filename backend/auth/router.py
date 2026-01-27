"""
Authentication API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from .schemas import UserCreate, UserLogin, UserResponse, Token, RefreshToken
from .crud import get_user_by_email, create_user, authenticate_user
from .utils import create_access_token, create_refresh_token, decode_token
from .dependencies import get_current_user
from .models import User
from jose import JWTError

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    
    Args:
        user_data: User registration data
        db: Database session
        
    Returns:
        Created user
        
    Raises:
        HTTPException: If email already exists
    """
    # Check if user already exists
    existing_user = get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user = create_user(db, user_data)
    return user


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Login with email and password.
    
    Args:
        credentials: Login credentials
        db: Database session
        
    Returns:
        JWT access and refresh tokens
        
    Raises:
        HTTPException: If credentials are invalid
    """
    user = authenticate_user(db, credentials.email, credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create tokens
    access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role.value})
    refresh_token = create_refresh_token(data={"sub": user.id})
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token
    )


@router.post("/refresh", response_model=Token)
async def refresh(refresh_data: RefreshToken, db: Session = Depends(get_db)):
    """
    Refresh access token using refresh token.
    
    Args:
        refresh_data: Refresh token
        db: Database session
        
    Returns:
        New access and refresh tokens
        
    Raises:
        HTTPException: If refresh token is invalid
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = decode_token(refresh_data.refresh_token)
        user_id: int = payload.get("sub")
        token_type: str = payload.get("type")
        
        if user_id is None or token_type != "refresh":
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    # Get user from database
    from .crud import get_user_by_id
    user = get_user_by_id(db, user_id)
    
    if user is None:
        raise credentials_exception
    
    # Create new tokens
    access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role.value})
    new_refresh_token = create_refresh_token(data={"sub": user.id})
    
    return Token(
        access_token=access_token,
        refresh_token=new_refresh_token
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """
    Get current user information.
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        Current user data
    """
    return current_user
