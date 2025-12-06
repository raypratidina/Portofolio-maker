# Portfolio CMS
A modern, dynamic portfolio website with a built-in Admin CMS (Content Management System). Built with **Next.js 14**, **PostgreSQL**, **Prisma**, and **Tailwind CSS**.

## ✨ Features
- **Dynamic Content**: Update everything (Profile, Experience, Projects) from the Admin Panel.
- **Admin Dashboard**: Secure login/register system.
- **Modern Design**: Responsive, Dark Mode support, and fast loading.
- **SEO Optimized**: Dynamic metadata for better Google ranking.

## 🛠️ Requirements
Before cloning, ensure you have:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [Git](https://git-scm.com/)
- A **PostgreSQL Database** (Recommended: [Neon.tech](https://neon.tech) for free cloud DB)

## 🚀 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/USERNAME/REPO_NAME.git
cd portfolio-cms
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a new file named `.env` in the root folder.
Copy and paste the following content, but **replace the values** with your own:

```env
# Database Connection String (Get this from Neon/Supabase/Local Postgres)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Security Key for Login (Random strings)
NEXTAUTH_SECRET="supersecretkey123"

# Base URL (http://localhost:3000 for local dev)
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Setup Database
Run this command to create the tables in your database:
```bash
npx prisma db push
```

### 5. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🔐 Admin Access
- Go to `/admin/login`
- Click "Need an account? Register" to create your first admin account.
- Once logged in, you can update your profile and add projects.

## 📦 Deployment
This project is ready to be deployed on **Vercel**.
1. Push your code to GitHub.
2. Import project in Vercel.
3. Add the Environment Variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`) in Vercel Settings.
4. Deploy!
