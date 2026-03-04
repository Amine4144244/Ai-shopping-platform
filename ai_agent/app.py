from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import os
from dotenv import load_dotenv
from agent import process_chat, process_recommendation

load_dotenv()

app = FastAPI(title="AI Shopping Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = []

class ProductItem(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    rating: float

class RecommendRequest(BaseModel):
    userMessage: str
    products: List[Dict[str, Any]]

@app.post("/api/ai/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        reply = process_chat(req.message, req.history)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ai/recommend")
async def recommend_endpoint(req: RecommendRequest):
    try:
        result = process_recommendation(req.userMessage, req.products)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
