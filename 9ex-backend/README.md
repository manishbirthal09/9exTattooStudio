# 9Ex Tattoo Studio — Backend API

## Setup

```bash
npm install
cp .env.example .env
```

Fill `.env` with:
- MongoDB Atlas connection string (`MONGO_URI`)
- A random long string for `JWT_SECRET`
- Cloudinary credentials (from cloudinary.com dashboard → Account Details)
- `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` / `ADMIN_SEED_KEY` — used once to create the first admin login

Run locally:
```bash
npm run dev
```

## Create the first admin (one-time)

After the server is running, call this once (Postman / curl / Thunder Client):

```bash
curl -X POST http://localhost:5000/api/auth/seed-admin \
  -H "Content-Type: application/json" \
  -d '{"key": "your ADMIN_SEED_KEY value from .env"}'
```

This creates an admin using `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`. Use those to log in
from the admin dashboard. After this, you can remove the `/seed-admin` route or leave it —
it will refuse to run again once an admin with that email exists.

## API Endpoints

| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| POST | /api/auth/login | — | returns JWT |
| GET | /api/auth/me | admin | current admin info |
| GET | /api/portfolio | — | `?category=` `?featured=true` |
| POST | /api/portfolio | admin | multipart, field `image` |
| PUT | /api/portfolio/:id | admin | multipart, field `image` optional |
| DELETE | /api/portfolio/:id | admin | |
| GET | /api/blogs | — | `?all=true` (admin, includes drafts) |
| GET | /api/blogs/:slug | — | public blog detail |
| GET | /api/blogs/id/:id | admin | for edit forms |
| POST | /api/blogs | admin | multipart, field `coverImage` |
| PUT | /api/blogs/:id | admin | |
| DELETE | /api/blogs/:id | admin | |
| GET | /api/testimonials | — | `?all=true` for admin |
| POST | /api/testimonials | admin | multipart, fields `video` (required), `thumbnail` (optional) |
| PUT | /api/testimonials/:id | admin | |
| DELETE | /api/testimonials/:id | admin | |
| GET | /api/reviews | — | `?all=true` for admin |
| POST | /api/reviews | admin | JSON body |
| PUT | /api/reviews/:id | admin | |
| DELETE | /api/reviews/:id | admin | |

All admin routes need header: `Authorization: Bearer <token>`

## Deploy

Same pattern as your Niara backend: deploy this on Render, add all `.env` vars in Render's
environment settings, and point `CLIENT_URL` / `ADMIN_URL` at your deployed Vercel URLs.
