# Ai Growth Exa

MERN Stack application for Ai Growth Exa - AI Based Marketing Agency.

## Structure
- `client/`: React + Vite Frontend
- `server/`: Node + Express Backend

## Getting Started

1. **Install Dependencies** (if not already done):
   ```bash
   npm install        # Root
   cd client && npm install
   cd server && npm install
   ```

2. **Run Development Mode**:
   ```bash
   npm run dev
   ```
   This runs both client (localhost:5173) and server (localhost:5000) concurrently.

## Environment Variables
- Run the backend from `server/` with `npm run dev` so nodemon starts `src/server.js` correctly.
- Server supports `MONGO_URI`, `MONGO_FALLBACK_URI` and `PORT` in `server/.env`.
- In development, if an Atlas `mongodb+srv` URI fails its DNS lookup, the server will try `MONGO_FALLBACK_URI` before exiting.
- Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env` before local setup.

## Production Deploy Checklist

### Vercel frontend
- Set `VITE_API_URL` to your live backend API, for example `https://ai-growth-exa-main-4.onrender.com/api`.
- Set `VITE_GOOGLE_CLIENT_ID` if Google sign-in should stay enabled in production.

### Render backend
- Set `NODE_ENV=production`.
- Set `CLIENT_URL=https://ai-growth-exa-main.vercel.app`.
- Set `CLIENT_URLS=https://ai-growth-exa-main.vercel.app,https://aigrowthexa.com,https://www.aigrowthexa.com` if all those domains should pass CORS.
- Set `MONGO_URI` and `JWT_SECRET`.
- Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` for OTP delivery.
- Redeploy the backend after env changes so the live service picks up the latest auth flow and mail config.

### OTP troubleshooting
- `POST /api/auth/register` should return quickly. If it hangs for a long time on production, the live backend is usually still on an older deploy or the mail provider call is blocking/failing.
- If Render logs show `Email sending failed`, verify `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and the sending domain in Resend.
