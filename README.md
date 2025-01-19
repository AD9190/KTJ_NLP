# E-commerce Customer Care Bot 🤖

A modern customer support solution combining OpenAI's GPT-3.5 with a sleek React frontend and FastAPI backend. This project provides an intelligent chatbot that can handle customer queries, provide product recommendations, and manage customer support interactions.

## 🌟 Features

### Chat Interface
- Modern, responsive dark-themed UI
- Real-time message updates
- Message history with auto-scrolling
- Loading states and error handling
- User-friendly input interface
- Icon indicators for bot and user messages

### Backend Capabilities
- Powered by OpenAI's GPT-3.5-turbo
- Conversation context management
- Efficient query resolution
- Product recommendations
- Information extraction
- Health monitoring endpoints

## 🛠 Prerequisites

- Python 3.10+
- Node.js and npm
- OpenAI API key
- Git

## 📦 Installation

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/customer-care-bot.git
cd customer-care-bot
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the project root:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Usage

### Starting the Backend

1. Run the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. Access the API documentation at `http://localhost:8000/docs`

### Starting the Frontend

1. Run the development server:
```bash
npm run dev
```

2. Access the chat interface at `http://localhost:3000`

## 🔧 API Endpoints

- `POST /chat`: Main chat endpoint
- `GET /health`: Health check endpoint
- `POST /clear`: Clear conversation history
- `GET /`: API status

## 💻 Code Structure

### Backend (`main.py`)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# ... (rest of the backend code)
```

### Frontend (`CustomerCareChat.jsx`)
```jsx
import React, { useState, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
# ... (rest of the frontend code)
```

## 🎨 UI Components

The chat interface includes:
- Message history display
- Input field with send button
- Loading indicators
- Error states
- Dark theme styling
- Responsive design

## 🔐 Security

- API key management through environment variables
- CORS configuration
- Input validation using Pydantic
- Error handling and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/YourFeature
```
3. Commit your changes:
```bash
git commit -m 'Add some feature'
```
4. Push to the branch:
```bash
git push origin feature/YourFeature
```
5. Open a pull request

## 📝 Configuration

### Environment Variables

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:8000` by default. Modify the API endpoint in `CustomerCareChat.jsx` if needed.

## 🚧 Error Handling

The application includes comprehensive error handling:
- API connection errors
- OpenAI API failures
- Invalid input handling
- Network issues

## 📚 Dependencies

### Backend
- FastAPI
- Uvicorn
- OpenAI
- Python-dotenv
- Pydantic

### Frontend
- React
- Lucide React
- Tailwind CSS
- Shadcn UI

## 🙏 Acknowledgments

- OpenAI for their GPT-3.5 API
- The FastAPI team
- The React community
- Contributors and testers

## 🔮 Future Improvements

- [ ] Add authentication
- [ ] Implement user session management
- [ ] Add message persistence
- [ ] Enhance error handling
- [ ] Add analytics dashboard
- [ ] Implement multi-language support

---

Created By:
Arijit Chatterjee
Ayan Dasgupta
Sagnik Basak
Soumyadip Maity
