# Quick Start Guide - JobPulse India

Get JobPulse India up and running in 5 minutes.

## 1. Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd project

# Install dependencies
npm install
```

## 2. Setup Supabase

1. Create account at [supabase.com](https://supabase.com) (free tier available)
2. Create new project
3. Go to Settings → API
4. Copy your `URL` and `anon key`

## 3. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=paste_your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_key_here
```

## 4. Apply Migrations

1. Go to Supabase dashboard → SQL Editor
2. Copy SQL from each migration file in `supabase/migrations/`
3. Paste and run in order:
   - `01_create_admin_users_table.sql`
   - `02_create_jobs_table.sql`
   - `03_create_categories_admit_results_tables.sql`
   - `04_create_bookmarks_subscribers_banners_tables.sql`
   - `05_seed_initial_data.sql`

## 5. Start Development

```bash
npm run dev
```

Visit `http://localhost:3000` - Your site is ready!

## 6. Create Admin Account

1. Register at `http://localhost:3000/auth/register`
2. Go to Supabase SQL Editor
3. Run:
```sql
INSERT INTO admin_users (user_id, email, role) 
SELECT id, email, 'admin' 
FROM auth.users 
WHERE email = 'your-email@example.com';
```
4. Visit `http://localhost:3000/admin`

## 7. Seed Data

Option 1: Via API
```bash
curl -X POST http://localhost:3000/api/seed
```

Option 2: Already seeded from migration step 4

## Quick Features to Try

- **Homepage**: See latest jobs
- **Search**: Try searching for "SSC"
- **Categories**: Click "Central Govt Jobs"
- **Job Details**: Click any job to see full details
- **Login**: Create account and bookmark jobs
- **Admin**: Login as admin to see analytics

## Deployment (Choose One)

### To Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### To Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Customization

### Change Site Name
Edit `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Your New Name - Latest Government Jobs',
  // ...
};
```

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --primary: 0 84% 60%; /* Red */
  --accent: 220 90% 56%; /* Blue */
}
```

### Add More Categories
Edit `lib/constants.ts`:
```typescript
export const CATEGORIES = [
  // ... existing
  { slug: 'new-job', name: 'New Job Type', icon: 'icon-name' },
];
```

### Add More Jobs
In Supabase SQL Editor:
```sql
INSERT INTO jobs (title, organization, category, vacancies, qualification, slug, is_active)
VALUES ('Job Title', 'Organization', 'Central Govt Jobs', 100, 'Bachelor Degree', 'job-slug', true);
```

## Common Issues & Solutions

**Q: Environment variables not working?**
- Ensure `.env.local` is in root directory
- Variables must start with `NEXT_PUBLIC_` for client-side
- Restart dev server after editing

**Q: Database connection error?**
- Check URL and key in `.env.local`
- Verify Supabase project is active
- Check network connectivity

**Q: Admin page not accessible?**
- Ensure user is in `admin_users` table with correct role
- Clear browser cache and re-login
- Check browser console for errors

**Q: Build error on deployment?**
- Run `npm run build` locally to check
- Verify all environment variables are set
- Check Node.js version (18+ required)

## File Structure Overview

```
project/
├── app/                    # Pages and API routes
├── components/            # React components
│   ├── ui/               # Pre-built UI components
│   └── [features]        # Feature components
├── lib/                  # Utilities and config
├── public/               # Static files
├── supabase/             # Database migrations
└── .env.local           # Your environment variables
```

## Next Steps

1. **Read Full Docs**: Check `README.md`
2. **Learn Deployment**: Check `DEPLOYMENT.md`
3. **Customize Design**: Edit components and styles
4. **Add Content**: Use admin panel to add jobs
5. **Deploy**: Follow deployment guide

## Getting Help

- Check `README.md` for detailed documentation
- Review `DEPLOYMENT.md` for deployment issues
- Check browser console for error messages
- Visit [Next.js Docs](https://nextjs.org/docs)
- Visit [Supabase Docs](https://supabase.com/docs)

## Key URLs (Development)

- Site: `http://localhost:3000`
- Register: `http://localhost:3000/auth/register`
- Login: `http://localhost:3000/auth/login`
- Admin: `http://localhost:3000/admin`
- Search: `http://localhost:3000/search`
- Central Govt Jobs: `http://localhost:3000/category/central-govt`
- Job Details: `http://localhost:3000/jobs/ssc-cgle-2024`
- Admit Cards: `http://localhost:3000/admit-card`
- Results: `http://localhost:3000/results`
- Sitemap: `http://localhost:3000/sitemap.xml`

---

Congratulations! You now have a fully functional government job portal. Start customizing and adding your content!

For production deployment, see `DEPLOYMENT.md`.
