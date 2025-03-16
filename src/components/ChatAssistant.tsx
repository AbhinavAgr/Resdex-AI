import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I\'m your recruitment assistant. How can I help you find the right candidate today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I recommend using more specific skills in your search query like 'React Native' or 'AWS Lambda' instead of general terms.",
        "You might want to consider candidates with startup experience for this role. Try adding 'startup' to your search criteria.",
        "Have you considered expanding your location search to include remote workers? This could increase your talent pool significantly.",
        "Based on your requirements, you might want to prioritize candidates with experience in financial services.",
        "For technical roles like this, I suggest filtering by candidates who have contributed to open source projects.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col"
          >
            {/* Chat header */}
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <h3 className="font-medium">Recruitment Assistant</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <X size={20} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-xl p-3 ${
                      message.isBot 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.isBot ? (
                        <Bot size={16} className="text-blue-600" />
                      ) : (
                        <User size={16} />
                      )}
                      <span className="text-xs opacity-75">
                        {message.isBot ? 'Assistant' : 'You'}
                      </span>
                    </div>
                    <p>{message.text}</p>
                    <div className="text-right mt-1">
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}