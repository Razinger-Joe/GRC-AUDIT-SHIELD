# Deployment Guide - GRC Audit Shield

This guide provides detailed instructions for deploying GRC Audit Shield to production.

## Railway Deployment (Backend + Frontend Monolithic)

### Prerequisites
- Railway account ([railway.app](https://railway.app))
- GitHub repository connected to Railway

### Step 1: Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose the GRC-AUDIT-SHIELD repository

### Step 2: Add PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically provision a PostgreSQL database
4. Note the connection string (available in "Connect" tab)

### Step 3: Configure Environment Variables

In Railway project settings, add these variables:

```bash
# Required
DATABASE_URL=${{ Postgres.DATABASE_URL }}  # Auto-filled by Railway
SECRET_KEY=<generate-with-openssl-rand-hex-32>
ENVIRONMENT=production
DEBUG=False

# CORS (add your Vercel domain if using separate frontend)
CORS_ORIGINS=["https://your-app.railway.app"]

# File Storage
STORAGE_TYPE=local
UPLOAD_DIR=/app/backend/uploads
MAX_UPLOAD_SIZE_MB=50

# Optional: AWS S3 (if using S3 storage)
# AWS_ACCESS_KEY_ID=your_access_key
# AWS_SECRET_ACCESS_KEY=your_secret_key
# AWS_REGION=us-east-1
# S3_BUCKET_NAME=your-bucket-name
```

### Step 4: Deploy

Railway will automatically deploy when you push to the configured branch (usually `main`).

```bash
git add .
git commit -m "deploy: initial production deployment"
git push origin main
```

### Step 5: Verify Deployment

1. Railway will provide a public URL (e.g., `https://your-app.railway.app`)
2. Check health endpoint: `https://your-app.railway.app/health`
3. Visit API docs: `https://your-app.railway.app/api/docs`
4. Access frontend: `https://your-app.railway.app/`

---

## Separate Frontend Deployment (Vercel)

If you want to deploy the frontend separately:

### Step 1: Deploy Frontend to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your project

### Step 2: Set Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-app.railway.app
   ```

### Step 3: Update CORS in Railway

Update the `CORS_ORIGINS` environment variable in Railway:
```bash
CORS_ORIGINS=["https://your-frontend.vercel.app"]
```

---

## Local Production Build Testing

Before deploying, test the production build locally:

### Using Docker

```bash
# Build the production image
docker build -t grc-audit-shield .

# Run with environment variables
docker run -p 8080:8080 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  -e SECRET_KEY=your-secret-key \
  -e ENVIRONMENT=production \
  grc-audit-shield
```

### Manual Build

```bash
# Build frontend
npm run build

# Test backend
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## Database Migrations

### Initial Setup

```bash
cd backend

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head
```

### Production Migrations

On Railway, migrations run on each deployment. To run manually:

1. Open Railway Shell
2. Run:
   ```bash
   cd /app/backend
   alembic upgrade head
   ```

---

## SSL/TLS Configuration

Railway automatically provides SSL certificates for all deployments. Your application will be available over HTTPS by default.

---

## Monitoring and Logging

### Railway Logs

View logs in Real-time:
1. Go to Railway Project
2. Click on your service
3. Click "Deployments" → Select deployment → "View Logs"

### Application Logging

The backend includes built-in logging. View logs via:
- Railway dashboard
- `docker logs` (if running locally)

### Audit Trail

All critical actions are logged in the database via the audit trail module:
- Access via API: `GET /api/audit/logs`
- View in database: `SELECT * FROM audit_logs ORDER BY created_at DESC;`

---

## Performance Optimization

### Caching

Add Redis for caching (optional):
1. In Railway, click "New" → "Database" → "Redis"
2. Update `.env`:
   ```
   REDIS_URL=${{ Redis.REDIS_URL }}
   ```

### Database Optimization

1. Add database indexes for frequently queried fields
2. Use connection pooling (already configured in SQLAlchemy)
3. Regular database maintenance:
   ```sql
   VACUUM ANALYZE;
   REINDEX DATABASE grc_audit_shield;
   ```

### File Storage

For production with high file usage, migrate to S3:
1. Create S3 bucket
2. Configure IAM credentials
3. Update environment variables:
   ```
   STORAGE_TYPE=s3
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   S3_BUCKET_NAME=your_bucket
   ```

---

## Backup Strategy

### Database Backups

Railway provides automatic backups for PostgreSQL. To create manual backup:

```bash
# Dump database
pg_dump -h host -U user -d database > backup.sql

# Restore
psql -h host -U user -d database < backup.sql
```

### File Backups

If using local storage:
1. Set up regular backups of `/app/backend/uploads/`
2. Consider migrating to S3 for built-in redundancy

---

## Scaling

### Vertical Scaling (Railway)
1. Go to Project Settings
2. Increase allocated resources (CPU/RAM)

### Horizontal Scaling
For high traffic:
1. Deploy multiple instances
2. Use load balancer
3. **Migrate to S3 for file storage** (required for multiple instances)
4. Add Redis for session management

---

## Troubleshooting

### Common Issues

**Database Connection Errors**
- Verify `DATABASE_URL` is correctly set
- Check database is running
- Verify network connectivity

**CORS Errors**
- Ensure `CORS_ORIGINS` includes your frontend domain
- Check protocol (http vs https)

**File Upload Failures**
- Verify `UPLOAD_DIR` has write permissions
- Check `MAX_UPLOAD_SIZE_MB` setting
- Ensure disk space is available

**Authentication Issues**
- Verify `SECRET_KEY` is set and consistent
- Check token expiration settings
- Clear localStorage and re-login

### Debug Mode

Enable debug mode temporarily:
```bash
DEBUG=True
```

**Warning**: Never leave debug mode enabled in production!

---

## Security Checklist

Before going to production:

- [ ] Change all default passwords
- [ ] Set strong `SECRET_KEY` (min 32 characters)
- [ ] Disable `DEBUG` mode
- [ ] Configure CORS properly
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Review user permissions
- [ ] Enable audit logging
- [ ] Set up monitoring
- [ ] Configure rate limiting (if needed)
- [ ] Review and update `.gitignore`
- [ ] Scan for vulnerabilities (`npm audit`, `safety check`)

---

## Support

For issues or questions:
- Create an issue on [GitHub](https://github.com/Razinger-Joe/GRC-AUDIT-SHIELD/issues)
- Check API documentation at `/api/docs`
- Review audit logs for debugging

---

**Happy Deploying! 🚀**
