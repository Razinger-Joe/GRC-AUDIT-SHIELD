# GRC Audit Shield

![Tests](https://img.shields.io/badge/tests-14%20passed-brightgreen)
![React](https://img.shields.io/badge/react-18.3-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.8-blue)
![FastAPI](https://img.shields.io/badge/fastapi-0.109-green)
![Python](https://img.shields.io/badge/python-3.11-blue)

A comprehensive Governance, Risk, and Compliance (GRC) audit platform built with React, TypeScript, Vite, and FastAPI.

## 🏗️ Architecture

This application uses a **monolithic architecture** approach:
- **Frontend**: React 18 + TypeScript + Vite + shadcn/ui
- **Backend**: FastAPI (Python 3.11) with PostgreSQL
- **Deployment**: Single Docker container or Railway deployment
- **File Storage**: Local filesystem (upgradeable to AWS S3)

## ✨ Features

### Core Modules
- **Compliance Management**: Track frameworks (SOC2, ISO27001, NIST, HIPAA, GDPR, PCI-DSS)
- **IT General Controls (ITGC)**: Manage and test IT controls
- **Risk Assessment**: Identify, analyze, and mitigate risks
- **Vulnerability Management**: Track CVEs with CVSS scoring
- **Evidence Management**: Upload and organize audit evidence
- **Audit Trail**: Comprehensive activity logging
- **Reporting**: Generate compliance and security reports
- **SOC Dashboard**: Real-time security operations monitoring

### Authentication & Security
- JWT-based authentication
- Role-based access control (Admin, Auditor, Viewer)
- Secure password hashing with bcrypt
- Token refresh mechanism

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)
- Python 3.11+ (for local backend development)

### Local Development with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/Razinger-Joe/GRC-AUDIT-SHIELD.git
   cd GRC-AUDIT-SHIELD
   ```

2. **Copy environment files**
   ```bash
   cp backend/.env.example backend/.env
   cp .env.local.example .env.local
   ```

3. **Update environment variables**
   Edit `backend/.env` and set:
   - `SECRET_KEY`: Generate with `openssl rand -hex 32`
   - `DATABASE_URL`: Already configured for Docker
   - Other settings as needed

4. **Start all services**
   ```bash
   docker-compose up -d
   ```

5.**Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api/docs
   - Health Check: http://localhost:8000/health

### Local Development without Docker

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env and configure DATABASE_URL for local PostgreSQL

# Run database migrations (if using Alembic)
alembic upgrade head

# Start development server
uvicorn main:app --reload --port 8000
```

#### Frontend Setup
```bash
# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# VITE_API_URL should be http://localhost:8000

# Start development server
npm run dev
```

## 📦 Production Deployment

### Railway Deployment

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Create a new project**
   ```bash
   railway init
   ```

4. **Add PostgreSQL database**
   ```bash
   railway add postgresql
   ```

5. **Set environment variables**
   ```bash
   railway variables set SECRET_KEY=$(openssl rand -hex 32)
   railway variables set ENVIRONMENT=production
   railway variables set DEBUG=False
   railway variables set CORS_ORIGINS='["https://your-frontend-domain.vercel.app"]'
   ```

6. **Deploy**
   ```bash
   railway up
   ```

7. **Get your deployment URL**
   ```bash
   railway domain
   ```

### Vercel Frontend Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variable**
   - Go to Vercel dashboard → Project Settings → Environment Variables
   - Add `VITE_API_URL` with your Railway backend URL

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest --cov=. --cov-report=html
```

### Frontend Tests
```bash
npm run test
```

### Linting
```bash
# Frontend
npm run lint

# Backend
cd backend
flake8 .
black --check .
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

#### Compliance
- `GET /api/compliance/frameworks` - List frameworks
- `GET /api/compliance/frameworks/{id}` - Get framework details
- `POST /api/compliance/assessments` - Create assessment
- `PATCH /api/compliance/assessments/{id}` - Update assessment

#### Evidence
- `POST /api/evidence/upload` - Upload evidence file
- `GET /api/evidence/` - List all evidence
- `DELETE /api/evidence/{id}` - Delete evidence

#### Audit Trail
- `GET /api/audit/logs` - Get audit logs
- `GET /api/audit/user/{id}/activity` - Get user activity

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.3
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 5.4
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + Testing Library

### Backend
- **Framework**: FastAPI 0.109
- **Language**: Python 3.11
- **Database**: PostgreSQL 16
- **ORM**: SQLAlchemy 2.0
- **Migrations**: Alembic
- **Authentication**: JWT (python-jose)
- **Validation**: Pydantic
- **Testing**: pytest

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Railway (backend) + Vercel (frontend)
- **Monitoring**: Built-in logging + audit trail

## 📂 Project Structure

```
GRC-AUDIT-SHIELD/
├── backend/                 # FastAPI backend
│   ├── auth/               # Authentication module
│   ├── compliance/         # Compliance management
│   ├── itgc/              # IT General Controls
│   ├── risk/              # Risk assessment
│   ├── vulnerabilities/    # Vulnerability management
│   ├── evidence/          # Evidence management
│   ├── audit_trail/       # Audit logging
│   ├── models/            # Database models
│   ├── utils/             # Utilities
│   ├── main.py            # FastAPI app
│   ├── config.py          # Configuration
│   ├── database.py        # Database setup
│   └── requirements.txt   # Python dependencies
├── src/                    # React frontend
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   ├── lib/              # Utilities & API client
│   └── hooks/            # Custom hooks
├── docker-compose.yml     # Local development setup
├── Dockerfile            # Production build
└── README.md             # This file
```

## 🔐 Security

- All passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Role-based access control (RBAC)
- CORS protection
- SQL injection protection via SQLAlchemy ORM
- Input validation with Pydantic
- Audit trail for all critical actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Razinger Joe** - [GitHub](https://github.com/Razinger-Joe)

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

For API documentation, visit `/api/docs` when the backend is running.
