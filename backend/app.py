from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import openai
import os
from datetime import datetime

# Initialize FastAPI app
app = FastAPI(title="Customer Care Bot API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Message(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    timestamp: str

# Initialize conversation history
conversation_history: List[dict] = []

# System message to set the bot's behavior
SYSTEM_MESSAGE = """You are a helpful customer service representative for an e-commerce website. 
Your goal is to assist customers with their queries about products, orders, shipping, and returns. 
Be professional, friendly, and concise in your responses. If you don't know something, admit it and 
offer to connect the customer with a human representative."""

def get_openai_response(user_message: str) -> str:
    try:
        # Add user message to conversation history
        conversation_history.append({"role": "user", "content": user_message})
        
        # Prepare messages for OpenAI
        messages = [
            {"role": "system", "content": SYSTEM_MESSAGE},
            *conversation_history[-5:]  # Keep last 5 messages for context
        ]
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=150,
            temperature=0.7,
            top_p=1.0,
        )
        
        # Extract and store bot response
        bot_response = response.choices[0].message.content
        conversation_history.append({"role": "assistant", "content": bot_response})
        
        return bot_response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat", response_model=ChatResponse)
async def chat(message: Message):
    try:
        # Get response from OpenAI
        response = get_openai_response(message.message)
        
        # Return response with timestamp
        return ChatResponse(
            response=response,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"status": "online", "message": "Customer Care Bot API is running"}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Clear conversation history endpoint (for testing)
@app.post("/clear")
async def clear_history():
    conversation_history.clear()
    return {"status": "success", "message": "Conversation history cleared"}

if __name__ == "__main__":
    import uvicorn
    # Make sure OPENAI_API_KEY is set in environment variables
    if not os.getenv("OPENAI_API_KEY"):
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    uvicorn.run(app, host="0.0.0.0", port=8000)