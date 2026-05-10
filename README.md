# JobPulse India - Government Job Alert Platform

A modern, mobile-first government job alert website built with Next.js 15, React, Tailwind CSS, and Supabase. Fast, clean, and SEO-optimized.

## Features

### Core Features
- **Real-time Job Alerts**: Latest government job notifications across multiple categories
- **Multiple Job Categories**: Central Govt, Railway, Defence, Police, Banking, Assam, and Private jobs
- **Rich Job Details**: Comprehensive job information including qualifications, dates, selection process, and application links
- **Search & Filter**: Advanced search with category, salary, and date filters
- **Responsive Design**: Fully mobile-optimized with bottom navigation for mobile users
- **Dark/Light Mode**: Seamless theme switching with next-themes

### Content Management
- **Admit Cards**: Download exam admit cards
- **Results**: Check exam and interview results
- **Answer Keys**: Access answer keys for exams
- **Scholarships**: Educational scholarship information
- **Bookmarks**: Save jobs for later (requires login)

### Admin Features
- **Admin Dashboard**: Analytics and statistics
- **Job Management**: Add, edit, delete jobs
- **Content Management**: Manage admit cards, results, and banners
- **User Management**: Manage admin users and roles
- **Analytics**: Track page views and job postings

### SEO & Performance
- **Automatic Meta Tags**: Dynamic metadata on all pages
- **JSON-LD Schema Markup**: JobPosting schema for job pages
- **Sitemap**: Auto-generated XML sitemap
- **robots.txt**: Search engine crawling rules
- **Static Generation**: Fast page loads with ISR
- **Image Optimization**: Next.js Image component

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Authentication**: Supabase Email/Password Auth
- **Database**: PostgreSQL with RLS policies
- **Charts**: Recharts for analytics
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner toast notifications
- **Dark Mode**: next-themes

## Project Structure

```
├── app/
│   ├── api/
│   │   └── seed/          # Database seeding endpoint
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── category/[slug]/   # Category pages
│   ├── jobs/[slug]/       # Job detail pages
│   ├── admin/             # Admin dashboard
│   ├── admit-card/        # Admit cards listing
│   ├── results/           # Results listing
│   ├── about/
│   ├── privacy-policy/
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── providers.tsx      # Auth context provider
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── job-card.tsx
│   ├── latest-jobs-section.tsx
│   └── admit-cards-section.tsx
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── constants.ts       # Categories and constants
├── public/
│   └── robots.txt
└── supabase/
    └── migrations/        # Database migrations
```

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account (free tier available)
- npm or yarn

### Environment Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd project
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Note your project URL and anon key
   - Create a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. **Run database migrations**
   - The migrations are automatically applied when deploying to Supabase
   - Alternatively, copy migration SQL from `supabase/migrations/` and run in Supabase SQL Editor

5. **Seed sample data**
```bash
# Start dev server
npm run dev

# In another terminal, seed database
curl -X POST http://localhost:3000/api/seed
```

6. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

## Database Schema

### Tables
- **jobs**: Government job postings
- **categories**: Job categories
- **admit_cards**: Exam admit cards
- **results**: Exam results
- **answer_keys**: Exam answer keys
- **scholarships**: Educational scholarships
- **bookmarks**: User bookmarked jobs
- **email_subscribers**: Email subscription list
- **admin_users**: Admin user roles
- **banners**: Promotional banners

All tables have Row Level Security (RLS) policies for data protection.

## Authentication

- **Email/Password Auth**: Built with Supabase Auth
- **Admin Role**: Required for admin dashboard access
- **Session Management**: Automatic with Supabase SDK

### Creating an Admin User
1. Create a regular account via signup
2. In Supabase, manually insert into `admin_users` table:
```sql
INSERT INTO admin_users (user_id, email, role) VALUES
  ('user-uuid-here', 'admin@example.com', 'admin');
```

## Features in Detail

### Homepage
- Hero banner with search and stats
- Latest job alerts grid
- Trending jobs section
- Admit cards carousel
- Results and scholarships
- FAQ section
- WhatsApp/Telegram integration

### Job Detail Page
- Full job information
- Important dates timeline
- Selection process steps
- How to apply instructions
- Multiple download links
- Social sharing buttons
- Related jobs section

### Search
- Real-time search suggestions
- Filter by category and salary
- Sortable results
- Pagination

### Admin Dashboard
- Analytics charts
- Job posting management
- Content management (admit cards, results, banners)
- User management
- System settings

## Customization

### Colors & Branding
Edit `app/globals.css` to change the color palette:
- Primary color (red): `--primary: 0 84% 60%`
- Secondary color: `--secondary: 0 0% 90%`
- Accent color: `--accent: 220 90% 56%`

### Categories
Add/edit categories in `lib/constants.ts`

### Social Links
Update WhatsApp and Telegram links in `lib/constants.ts`

### Site Metadata
Edit metadata in `app/layout.tsx` for SEO

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Deploy!

### Deploy to Netlify

1. **Connect to Netlify**
   - Link your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Add environment variables** in Netlify dashboard

3. **Deploy**

## Performance Optimization

- **ISR**: Incremental Static Regeneration for job pages (60s revalidation)
- **Image Optimization**: Using Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Images and components
- **Compression**: Gzip enabled
- **Caching**: Browser and server caching

## SEO

- **Dynamic Meta Tags**: Every page has unique metadata
- **JSON-LD Schema**: Job posting schema markup
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Crawling rules configured
- **Open Graph**: Social media sharing
- **Twitter Cards**: Tweet previews
- **Canonical URLs**: Prevents duplicate content

## API Routes

- `POST /api/seed`: Seed initial data (development only)

## Contributing

Contributions welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use for personal or commercial projects

## Support

For issues or questions:
- Check existing GitHub issues
- Email: support@jobpulseindia.com
- WhatsApp: +91 98765 43210

## Roadmap

- [ ] Email digest notifications
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Job recommendations AI
- [ ] Resume builder
- [ ] Interview preparation
- [ ] Job application tracking
- [ ] Referral system

## Changelog

### v1.0.0 (Initial Release)
- Complete job portal platform
- Admin dashboard
- Search and filtering
- Mobile-responsive design
- SEO optimization
- Database with RLS security

---

Built with by JobPulse India • [Visit Website](https://jobpulseindia.com)
