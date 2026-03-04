# ShopAI - AI Powered Shopping Platform

ShopAI is a full-stack, AI-powered e-commerce platform that acts as your personal shopping assistant. It enables users to browse, search, and discover products seamlessly while conversing with an advanced AI integration for tailored recommendations driven by Groq's LLM infrastructure.

## Tech Stack Overview
- **Frontend**: React, Vite, Tailwind CSS, React Router, Zustand.
- **Backend API**: Node.js, Express, MongoDB (Mongoose), JWT Auth.
- **AI Agent Service**: Python, FastAPI, Groq Client.

## Architecture Guidelines
- **Stateless AI**: The AI service (FastAPI) is entirely stateless.
- **Proxy Setup**: React Frontend -> Node/Express Backend -> Python AI Agent -> Groq LLM.
- **Structured Data**: The AI outputs deterministic JSON recommendations based ONLY on the products seeded in the MongoDB database to prevent hallucinations.

## Deployment (Vercel)

This project is structured as a monorepo and can be deployed to Vercel as three separate projects linked to the same GitHub repository:

### 1. Frontend (React/Vite)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: 
  - `VITE_API_URL`: URL of your deployed backend.

### 2. Backend (Node.js/Express)
- **Root Directory**: `backend`
- **Environment Variables**:
  - `MONGODB_URI`: Your MongoDB Atlas connection string.
  - `JWT_SECRET`: A long random string.
  - `PYTHON_AI_URL`: URL of your deployed AI Agent.
  - `CLIENT_URL`: URL of your deployed frontend.

### 3. AI Agent (Python/FastAPI)
- **Root Directory**: `ai_agent`
- **Environment Variables**:
  - `GROQ_API_KEY`: Your Groq API key.

### Setup Instructions
1. Push your code to GitHub.
2. Link your GitHub repo to Vercel three times (once for each folder).
3. Set the **Root Directory** for each project in the Vercel project settings.
4. Add the required environment variables for each project.

