# 9Ex Admin Dashboard

React (Vite) admin panel for managing the 9Ex Tattoo Studio website content.
Talks to the `9ex-backend` API.

## Setup

```bash
npm install
cp .env.example .env
```

Set `VITE_API_URL` in `.env` to your backend URL:
- Local: `http://localhost:5000/api`
- Production: `https://your-backend.onrender.com/api`

## Run

```bash
npm run dev
```

Opens on `http://localhost:5174`. Log in with the admin credentials you
created via the backend's `/api/auth/seed-admin` route.

## Pages

- **Portfolio** — add/edit/delete gallery images, mark as "featured" to show on homepage slider
- **Blogs** — write/edit posts with a cover image, draft/publish toggle, auto-generated slug
- **Video Testimonials** — upload client videos (+ optional thumbnail) via Cloudinary
- **Reviews** — add/edit text reviews, approve/hide without deleting

## Deploy

Deploy as a static Vite build (same pattern as your Niara admin dashboard):

```bash
npm run build
```

Then deploy the `dist` folder to Vercel as its own project, separate from the
customer-facing frontend. Set `VITE_API_URL` as an environment variable in
Vercel pointing to your deployed backend.

## Connecting the main site

Right now the public 9Ex frontend (`Home.jsx` etc.) still reads from
`siteData.js`. Once you're happy with the data you enter here, the frontend's
static arrays (`featuredWork`, `testimonials`, etc.) need to be swapped for
`fetch`/`axios` calls to the backend's public GET endpoints
(`/api/portfolio`, `/api/testimonials`, `/api/reviews`, `/api/blogs`) — happy
to wire that up next.
