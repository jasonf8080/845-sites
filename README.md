# 845 Sites

Marketing site + client project portal for 845 Sites, an independent web design studio serving the
Hudson Valley / 845 area. Built with Vite, React, Tailwind, GSAP, and Supabase (Auth + Database + Storage).

## What this app does

- **Home page** — marketing content, pricing ($350 flat-rate website build, $25/month maintenance), and a
  "Start Your Project" call to action.
- **`/login`** — clients sign in with Google (Supabase Auth).
- **`/dashboard`** — signed-in clients see their own project submissions and live status, and can start a
  new project through a 3-step form (Business Details → Website Preferences → Review & Submit).
- **`/admin-login`** — a separate email/password sign-in page for you, the site owner (not linked in the
  nav — bookmark it).
- **`/admin`** — only the account matching `VITE_ADMIN_EMAIL` can reach this page. It lists every
  submission from every client and lets you change status: **Not Received → Received → In Progress →
  Completed**. Clients see that status update on their own dashboard in real time.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com), create a free account, and create a new project.
2. In the dashboard, go to **Project Settings → API** and copy the **Project URL** and **anon/public key**.
3. Go to **SQL Editor → New query**, paste the entire contents of `supabase/schema.sql` from this project,
   and click **Run**. This creates the `project_submissions` table, its security rules, and the
   `inspiration-images` storage bucket.

## 2. Enable Google sign-in

1. In Supabase, go to **Authentication → Providers → Google** and enable it.
2. You'll need a Google OAuth Client ID/Secret from the
   [Google Cloud Console](https://console.cloud.google.com/apis/credentials) (OAuth consent screen +
   OAuth 2.0 Client ID, type "Web application").
3. Add this authorized redirect URI in Google Cloud Console (Supabase shows you the exact URL to copy on
   the same provider settings page): `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. Paste the Google Client ID and Secret into Supabase and save.
5. In **Authentication → URL Configuration**, add your site's URL (e.g. `http://localhost:5173` for local
   dev, and your live Netlify URL later) to **Redirect URLs**.

## 3. Create your admin login

The admin dashboard uses a normal Supabase email/password user — it just has to match the email in
`VITE_ADMIN_EMAIL`.

1. In Supabase, go to **Authentication → Users → Add user → Create new user**.
2. Use `jasonf8080@gmail.com` and set a password you'll remember.
3. Leave "Auto Confirm User" checked (or confirm it manually) so you can sign in immediately.
4. You'll sign in at `/admin-login` with that email + password — not through Google.

## 4. Configure environment variables

Copy `.env.example` to `.env` and fill in the values from step 1:

```
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_ADMIN_EMAIL=jasonf8080@gmail.com
```

## 5. Run it locally

```
npm install
npm run dev
```

Visit `http://localhost:5173`.

## 6. Deploy to Netlify

1. Push this project to a GitHub repo and connect it to Netlify (build command `npm run build`, publish
   directory `dist`).
2. In Netlify, go to **Site configuration → Environment variables** and add the same three variables from
   your `.env` file.
3. `public/_redirects` (already included, and copied into `dist/` automatically by Vite) makes client-side
   routes like `/dashboard` and `/admin` work on refresh instead of 404ing.
4. After the first deploy, add your live Netlify URL to Supabase's **Authentication → URL Configuration →
   Redirect URLs**, and add the matching authorized redirect URI in Google Cloud Console if you use a
   custom domain.

## Notes & things to swap in later

- **Branding**: no logo was supplied yet, so the favicon is a placeholder "845" mark and the color
  palette (`primary` navy / `accent` orange) is a placeholder too — both live in one place
  (`tailwind.config.js` for colors, `public/` for the favicon set) so they're easy to replace.
- **Photos**: no photos were supplied for 845 Sites, so the homepage uses a solid/gradient hero instead of
  a photo. Drop real photos into `src/assets` and swap them into `Hero.jsx`/`WhyChooseUs.jsx` whenever
  you have them.
- **Payment**: the form only collects the project request — it does not charge a card. You follow up by
  email to arrange payment for the $350 build or $25/month maintenance. Ask if you'd like a Stripe
  Checkout step added to the flow later.
- **Domain**: `robots.txt`, `sitemap.xml`, and the SEO meta tags use `https://845sites.com` as a
  placeholder — update those once you register a real domain.
