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
