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

