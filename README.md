# Full-Stack Blog (MERN)

A complete MERN application that lets authenticated users create, read, update, and delete blog posts with JWT-based authentication, client-side routing, and polished UX.

## Tech Stack

- **Backend:** Node.js, Express 5, MongoDB (Mongoose), JWT, bcrypt, express-validator
- **Frontend:** React + Vite + TypeScript, React Router, Zustand, Axios, React Hot Toast
- **Tooling:** Nodemon, Day.js

## Project Structure

```
/client      # Vite + React frontend
/server      # Express + MongoDB backend
README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (Atlas or local)

### Backend

```bash
cd server
cp .env.example .env   # fill PORT, MONGODB_URI, JWT_SECRET, CORS_ORIGIN
npm install
npm run dev            # starts nodemon on http://localhost:5000
```

### Frontend

```bash
cd client
cp .env.example .env   # set VITE_API_URL (defaults to http://localhost:5000/api)
npm install
npm run dev            # launches Vite on http://localhost:5173
```

## Available Scripts

| Location | Script      | Purpose                         |
|----------|-------------|---------------------------------|
| server   | `npm run dev` | Start API with Nodemon          |
| server   | `npm run start` | Production server start        |
| client   | `npm run dev` | Start Vite dev server          |
| client   | `npm run build` | Type-check & build frontend    |
| client   | `npm run preview` | Preview production build      |

## API Overview

Base URL: `/api`

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/auth/register` | Register user `{ username, email, password }` | Yes |
| POST | `/auth/login` | Login `{ identifier, password }` | Yes |
| GET | `/posts` | List posts with `search`, `page`, `limit` | Yes |
| GET | `/posts/:id` | Get single post | Yes |
| GET | `/posts/me` | Posts for logged-in user | Yes |
| POST | `/posts` | Create post | Yes |
| PUT | `/posts/:id` | Update post (owner only) | Yes |
| DELETE | `/posts/:id` | Delete post (owner only) | Yes |

Responses follow `{ message, data, pagination? }` shape with consistent error `{ message, details }`.

See `server/requests.http` for ready-to-run REST Client snippets.

## Validation & Security

- Server-side validation via `express-validator`
- Password hashing with `bcryptjs`
- JWT auth middleware guards all write routes
- Ownership checks ensure only authors can edit/delete their posts
- CORS locked to configured origin
- Client mirrors validations and surfaces inline errors

## Frontend Highlights

- React Router pages: Feed, Post Detail, Create/Edit, Auth, Profile
- Zustand store for token/user with localStorage persistence
- Axios abstraction with interceptors injects JWT
- Search, pagination, loading & empty states, toasts, and delete confirmations

## Testing & Deployment Notes

- Use the provided `.env.example` files to configure environments
- Run `npm run build` in `/client` before deploying the frontend
- Deploy backend (e.g., Render, Railway) and expose `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`
- Point `VITE_API_URL` to deployed API before building the frontend

## Screenshots / Demo

Add screenshots or a short GIF of the UI after running `npm run dev` in both folders (not included in this repo).

-Register
<img width="1920" height="1080" alt="Screenshot 2025-11-18 231122" src="https://github.com/user-attachments/assets/b9688705-7030-4b95-886b-17dcf35187f9" />
<br>

-Login
<img width="1920" height="1080" alt="Screenshot 2025-11-18 231108" src="https://github.com/user-attachments/assets/625cec07-6da2-4735-874c-e4254d633b22" />
<br>

-Feed
<img width="1920" height="1080" alt="Screenshot 2025-11-18 231000" src="https://github.com/user-attachments/assets/d4096a9b-1d55-4612-8c47-ab81905ba3ce" />
<br>

-Create Post
<img width="1920" height="1080" alt="Screenshot 2025-11-18 231031" src="https://github.com/user-attachments/assets/71c93c64-8f4e-4327-8217-d4a647579bef" />
<br>

-My Posts
<img width="1920" height="1080" alt="Screenshot 2025-11-18 231012" src="https://github.com/user-attachments/assets/86d52be5-def0-400f-bcab-f7c73fef3a87" />
<br>










