# Al-Quran Next.js & Node.js Application

A full-stack Quran application with a Next.js frontend and an Express.js backend.

## Structure
- `/frontend`: Next.js application.
- `/backend`: Express.js API with SQLite database.
- `/previews`: Project preview images (locally stored).

## Getting Started

### Local Setup
1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run seed  # Optional: seed the database
   npm run dev
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment

### Frontend (Netlify)
The frontend is configured for deployment on Netlify using the `netlify.toml` file in the root.

**Command to deploy via Netlify CLI:**
1. Install CLI: `npm install -g netlify-cli`
2. Login: `netlify login`
3. Deploy: `netlify deploy --build`

### Backend
The backend uses SQLite and Express. For deployment, it is recommended to use a service that supports persistent storage for SQLite, such as [Render.com](https://render.com) or [Railway.app](https://railway.app).

---

## .gitignore
The repository excludes `node_modules`, build artifacts (`.next`), and the `previews/` folder to keep the repository clean.
