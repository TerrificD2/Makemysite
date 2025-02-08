import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSend } from 'react-icons/io5';
import { socket } from '@/services/socket';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user' | 'executive';
  timestamp: Date;
}

const GREETING_MESSAGE = "👋 Hi! Welcome to MakemySite. How can I help you today?";
const BOT_OPTIONS = [
  "I want to create a website",
  "I need a custom web application",
  "I want to talk to an executive",
];

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveChat = ({ isOpen, onClose }: LiveChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnectingToExecutive, setIsConnectingToExecutive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting
      setMessages([{
        id: '1',
        text: GREETING_MESSAGE,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    socket.on('executive-message', (message) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: message,
        sender: 'executive' as const,
        timestamp: new Date()
      }]);
    });

    socket.on('executive-connected', () => {
      setIsConnectingToExecutive(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "An executive has joined the chat. How can we help you today?",
        sender: 'executive' as const,
        timestamp: new Date()
      }]);
    });

    return () => {
      socket.off('executive-message');
      socket.off('executive-connected');
    };
  }, []);

  const handleBotResponse = (userMessage: string) => {
    if (userMessage.toLowerCase().includes('executive')) {
      setIsConnectingToExecutive(true);
      socket.emit('request-executive');
      return "Connecting you to an executive...";
    }
    // Add more bot logic here
    return "Would you like to talk to an executive for more detailed information?";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    if (!isConnectingToExecutive) {
      // Bot response
      setTimeout(() => {
        const botResponse = handleBotResponse(inputMessage);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: botResponse,
          sender: 'bot' as const,
          timestamp: new Date()
        }]);
      }, 1000);
    } else {
      // Send to executive
      socket.emit('client-message', inputMessage);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="w-full max-w-3xl h-[80vh] bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">MakemySite Assistant</h3>
                <p className="text-sm text-white/60">
                  {isConnectingToExecutive ? "Connecting to executive..." : "Bot Assistant"}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-white/10 ml-auto'
                        : message.sender === 'executive'
                        ? 'bg-blue-500/20'
                        : 'bg-white/5'
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs text-white/40 mt-1">
                      {message.sender === 'executive' && '👤 Executive • '}
                      {message.sender === 'bot' && '🤖 Bot • '}
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {!isConnectingToExecutive && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {BOT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setInputMessage(option);
                        handleSendMessage(new Event('submit') as any);
                      }}
                      className="bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-sm transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={isConnectingToExecutive ? "Chat with executive..." : "Type your message..."}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-white/20"
                />
                <button
                  type="submit"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors"
                >
                  <IoSend />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveChat; 