import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def get_groq_client():
    if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key_here":
        raise ValueError("GROQ_API_KEY is not set or is invalid.")
    return Groq(api_key=GROQ_API_KEY)

def process_chat(message: str, history: list) -> str:
    """Handle general conversational queries."""
    client = get_groq_client()
    
    messages = [
        {"role": "system", "content": "You are a helpful and polite AI shopping assistant. Be concise."}
    ]
    
    for msg in history:
        messages.append({"role": msg.get("role", "user"), "content": str(msg.get("content", ""))})
        
    messages.append({"role": "user", "content": message})
    
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # Make sure to use an available Groq model
            messages=messages,
            max_tokens=256,
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Groq API Error in chat: {e}")
        return "I'm having trouble connecting right now. Please try again later."

def process_recommendation(user_message: str, products: list) -> dict:
    """Handle deterministic product recommendations strictly from the provided list."""
    client = get_groq_client()
    
    products_json = json.dumps(products, indent=2)
    
    system_prompt = f"""You are an AI shopping assistant.
Your task is to understand the user intent (budget, category, preferences) and recommend products ONLY from the provided list.
You must be deterministic and return a structured JSON response.
Do NOT hallucinate products that are not on the list.
If no products match, provide an empty recommendations list and explain why.

Provided Products:
{products_json}

The Output MUST be a valid JSON object matching this schema:
{{
  "reply": "A brief message to the user explaining the recommendations.",
  "recommendations": [
    {{
      "productId": "id of the product",
      "reason": "Brief reason why this product is recommended based on their query"
    }}
  ]
}}
DO NOT include markdown block markers (like ```json). Just return the raw JSON.
"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ]
    
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.0, # Deterministic
            response_format={"type": "json_object"}
        )
        
        content = response.choices[0].message.content
        result = json.loads(content)
        return result
    except Exception as e:
        print(f"Groq API Error in recommend: {e}")
        return {
            "reply": "Sorry, I couldn't process your recommendation request at the moment.",
            "recommendations": []
        }
