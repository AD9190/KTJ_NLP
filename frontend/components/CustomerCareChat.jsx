import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomerCareChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });
      
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        content: data.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col bg-zinc-900 border-zinc-700">
      <CardHeader className="border-b border-zinc-700">
        <CardTitle className="flex items-center gap-2 text-white">
          <Bot className="w-6 h-6" />
          Customer Care Bot
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden flex flex-col bg-zinc-900">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex gap-2 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg'
                    : 'bg-zinc-800 text-zinc-100 rounded-r-lg rounded-bl-lg'
                } p-3`}
              >
                {message.sender === 'bot' && (
                  <Bot className="w-5 h-5 flex-shrink-0" />
                )}
                <p className={message.isError ? 'text-red-400' : ''}>
                  {message.content}
                </p>
                {message.sender === 'user' && (
                  <User className="w-5 h-5 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-700 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 p-2 border rounded-lg bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerCareChat;