# Deployment Guide for JobPulse India

This guide covers deploying JobPulse India to production environments.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Sample data seeded
- [ ] Admin user created
- [ ] Build successfully: `npm run build`
- [ ] All pages tested locally: `npm run dev`
- [ ] Meta tags and SEO verified
- [ ] Images optimized
- [ ] Security review completed

## Environment Variables

Create `.env.local` or configure in your deployment platform:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

Get these values from your Supabase project settings:
1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Settings → API
4. Copy URL and anon key

## Option 1: Deploy to Vercel (Recommended)

Vercel is the optimal platform for Next.js applications.

### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial JobPulse India commit"
git branch -M main

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/jobpulse-india.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select Next.js from framework suggestions (auto-detected)
5. Click "Deploy"

### Step 3: Configure Environment Variables

In Vercel dashboard:
1. Go to project Settings
2. Select "Environment Variables"
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Click "Save"

### Step 4: Deploy

1. Click "Deployments" tab
2. Click "Redeploy" on the latest commit
3. Wait for deployment to complete
4. Your site is live!

**Custom Domain:**
1. Go to project Settings → Domains
2. Add your custom domain
3. Update DNS records in your domain provider

## Option 2: Deploy to Netlify

### Step 1: Prepare for Netlify

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"
  functions = "netlify/functions"

[context.production.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Already included in this project!

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Choose "Connect to Git"
4. Authorize GitHub
5. Select your repository
6. Click "Deploy site"

### Step 3: Add Environment Variables

1. Go to Site settings
2. Select "Build & deploy" → "Environment"
3. Click "Edit variables"
4. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Redeploy site

## Option 3: Self-Hosted (Server)

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (or use Supabase)
- Nginx or Apache (reverse proxy)
- PM2 or similar (process manager)

### Step 1: Clone Repository

```bash
cd /var/www
git clone <your-repo-url> jobpulse
cd jobpulse
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Step 3: Build Application

```bash
npm run build
```

### Step 4: Setup Process Manager (PM2)

```bash
npm install -g pm2

# Start application
pm2 start npm --name "jobpulse" -- start

# Configure to restart on system reboot
pm2 startup
pm2 save
```

### Step 5: Setup Nginx Reverse Proxy

Create `/etc/nginx/sites-available/jobpulse`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name jobpulseindia.com www.jobpulseindia.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static files
    location /_next/static {
        proxy_pass http://localhost:3000/_next/static;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /public {
        proxy_pass http://localhost:3000/public;
        expires 30d;
        add_header Cache-Control "public";
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name jobpulseindia.com www.jobpulseindia.com;

    # SSL certificates from Let's Encrypt
    ssl_certificate /etc/letsencrypt/live/jobpulseindia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jobpulseindia.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name jobpulseindia.com www.jobpulseindia.com;
    return 301 https://$server_name$request_uri;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/jobpulse /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup SSL with Let's Encrypt

```bash
sudo certbot certonly --webroot -w /var/www/jobpulse -d jobpulseindia.com -d www.jobpulseindia.com
```

## Database Setup

### For Supabase (Already Configured)

1. Create Supabase project
2. Migrations are in `supabase/migrations/`
3. Run each migration in SQL editor
4. Seed data via `/api/seed` endpoint

### For Self-Hosted PostgreSQL

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE jobpulse;

# Run migrations
\c jobpulse
\i supabase/migrations/01_create_admin_users_table.sql
\i supabase/migrations/02_create_jobs_table.sql
# ... run all migrations

# Seed data
\i supabase/migrations/05_seed_initial_data.sql
```

## Post-Deployment

### Verify Deployment

1. **Check Site**: Visit your domain
2. **Test Functionality**:
   - View homepage
   - Search jobs
   - View job details
   - Try category pages
   - Test authentication
3. **Check SEO**:
   - Verify sitemap: `/sitemap.xml`
   - Check robots.txt: `/robots.txt`
   - Test meta tags in browser
4. **Monitor Performance**:
   - Check Vercel analytics (if deployed there)
   - Monitor database queries
   - Check error logs

### Create Admin User

```sql
-- In Supabase SQL Editor or psql
INSERT INTO admin_users (user_id, email, role) VALUES
  ('ACTUAL_USER_UUID_HERE', 'admin@jobpulseindia.com', 'admin');
```

### Setup SSL Certificate

Already handled by Vercel/Netlify. For self-hosted, use Let's Encrypt as shown above.

### Performance Optimization

1. **Enable Caching**:
   - Vercel/Netlify handles automatically
   - For self-hosted, configure Nginx cache

2. **Monitor Database**:
   - Check slow queries
   - Add indexes if needed
   - Monitor connection pool

3. **Setup Monitoring**:
   - Use Sentry for error tracking
   - Setup uptime monitoring
   - Monitor page load times

## Scaling Considerations

### As Traffic Grows

1. **Database Optimization**:
   - Upgrade Supabase plan
   - Add more read replicas
   - Optimize queries

2. **Caching Layer**:
   - Add Redis for session storage
   - Implement API response caching
   - Use CDN for static files

3. **Load Balancing** (Self-hosted):
   - Setup multiple application servers
   - Use load balancer (HAProxy, nginx)
   - Scale horizontally

4. **Background Jobs**:
   - Send emails asynchronously
   - Process notifications
   - Generate analytics

## Maintenance

### Regular Tasks

- **Weekly**: Check error logs, monitor database
- **Monthly**: Update dependencies, review analytics
- **Quarterly**: Performance audit, security review
- **Annually**: SSL certificate renewal (if self-hosted)

### Backup Strategy

For Supabase:
- Automatic backups included
- Export data regularly to GitHub

For self-hosted:
- Daily PostgreSQL backups
- Backup to S3 or cloud storage
- Test backup restoration

### Updates

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Test thoroughly
npm run build
npm run dev

# Deploy when ready
git add .
git commit -m "Update dependencies"
git push
```

## Troubleshooting

### Site Not Loading
- Check environment variables
- Verify Supabase connection
- Check browser console for errors
- Review server logs

### Database Connection Issues
- Verify credentials in .env
- Check Supabase status
- Review RLS policies
- Check network connectivity

### Performance Issues
- Check database query performance
- Review Lighthouse scores
- Monitor server resources
- Enable caching

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

---

For questions or issues, contact: support@jobpulseindia.com
