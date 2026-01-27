"""
Main FastAPI application.
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from .config import settings
from .database import init_db, engine, Base

# Import all models to ensure they're registered with SQLAlchemy
from .auth.models import User
from .compliance.models import Framework, FrameworkRequirement, ComplianceAssessment
from .itgc.models import ITControl, ControlTest
from .risk.models import Risk, RiskMitigation
from .vulnerabilities.models import Vulnerability, PatchRecord
from .evidence.models import Evidence
from .audit_trail.models import AuditLog

# Import routers
from .auth import router as auth_router
from .compliance import router as compliance_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    print("🚀 Starting GRC Audit Shield Backend...")
    print(f"📦 Environment: {settings.ENVIRONMENT}")
    print(f"🗄️  Database: {settings.DATABASE_URL.split('@')[-1] if '@' in settings.DATABASE_URL else 'local'}")
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    
    yield
    
    # Shutdown
    print("👋 Shutting down GRC Audit Shield Backend...")


# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Comprehensive Governance, Risk, and Compliance audit platform API",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler."""
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "error": str(exc) if settings.DEBUG else "An error occurred"
        }
    )


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT
    }


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": f"Welcome to {settings.APP_NAME} API",
        "version": settings.APP_VERSION,
        "docs": "/api/docs",
        "health": "/health"
    }


# Register routers
app.include_router(auth_router)
app.include_router(compliance_router)
# Additional routers will be registered here as they're created


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
