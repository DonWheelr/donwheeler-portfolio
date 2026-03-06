# Don Wheeler — Portfolio Site

A clean, minimal portfolio built with Next.js 14 and Tailwind CSS.

## 🚀 Deploy to Vercel (3 steps)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   gh repo create don-wheeler-portfolio --public --push
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Git Repository"**
   - Select `don-wheeler-portfolio`
   - Click **Deploy** — Vercel auto-detects Next.js, no config needed

3. **Add your live project URLs**
   - Open `src/app/page.tsx`
   - Find the `projects` array at the top
   - Fill in the `live:` field for each project once deployed

## 🛠 Run Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## ✏️ Customization Checklist

- [ ] Replace `[your-email]` in the Contact section with your real email
- [ ] Add your LinkedIn URL to the nav or contact section
- [ ] Fill in `live:` URLs for each project once deployed to Vercel
- [ ] Add your phone number if desired

## 📁 Project Structure

```
src/
  app/
    page.tsx      ← All content lives here (projects, skills, bio)
    layout.tsx    ← Page title & metadata
    globals.css   ← Design tokens & fonts
```
