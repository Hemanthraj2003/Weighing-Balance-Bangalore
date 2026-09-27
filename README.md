# Weighing Balance Bangalore

A modern full-stack web application for laboratory and industrial weighing balance solutions, catalog browsing, spec-sheet downloads, and enquiry management.

Migrated from React/Vite + Java Spring Boot to a unified Next.js (App Router) architecture with Supabase Cloud PostgreSQL and Cloudinary Media CDN.

---

## 🌟 Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, Server Components & Route Handlers)
- **Database**: Supabase PostgreSQL via Prisma ORM
- **Media CDN**: Cloudinary (Product images, PDFs, static marketing assets)
- **Authentication**: JWT stored in HTTP-only cookies (`jose`) with Next.js Middleware route protection
- **Styling**: Tailwind CSS & Modular CSS

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.x or higher
- npm or yarn

### 2. Environment Variables
Create or verify `.env` in the root directory:

```env
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"

CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

JWT_SECRET="your-secure-jwt-secret-at-least-32-characters"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Sync
```bash
npx prisma db push
```

To seed the database with initial catalog and admin user:
```bash
node prisma/seed.mjs
```

### 5. Running the Application

#### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build & Start
```bash
npm run build
npm run start
```

---

## 🔐 Admin Portal

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Username**: `wbbadmin`
- **Default Password**: `wbb@Admin2026`

---

## 📁 Project Structure

```
├── app/                  # Next.js App Router (pages & API routes)
│   ├── (public)/         # Public storefront pages (Home, About, Products, etc.)
│   ├── admin/            # Admin portal & dashboard
│   └── api/              # 1:1 REST API route handlers
├── components/           # Reusable UI components
├── lib/                  # Prisma client, Cloudinary client, JWT auth helpers
├── prisma/               # Prisma schema and seed scripts
├── public/               # Essential brand assets (logo)
└── styles/               # Global CSS
```
