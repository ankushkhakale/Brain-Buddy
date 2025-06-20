
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Star, Brain } from "lucide-react";

interface ChatBotProps {
  mood: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatBot = ({ mood }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getBotGreeting(mood),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  function getBotGreeting(currentMood: string): string {
    switch (currentMood) {
      case 'happy': return "Hi there! 😊 I'm so happy to see you! What would you like to learn about today?";
      case 'excited': return "WOW! 🤩 You seem excited and I LOVE that energy! What amazing topic should we explore?";
      case 'calm': return "Hello, my friend 😌 I can sense you're feeling peaceful today. Let's learn something interesting together, shall we?";
      case 'curious': return "Ooh, I can see that curious spark in you! 🤔 What's got you wondering today? I'm here to help explore!";
      case 'tired': return "Hey there 😴 Feeling a bit tired? That's okay! Let's take it easy and learn something fun without any pressure.";
      case 'confused': return "Hi! 😕 I can help clear things up for you. What's been puzzling you? Let's work through it step by step!";
      default: return "Hello! I'm your AI study buddy! What would you like to learn about today?";
    }
  }

  const generateBotResponse = (userMessage: string): string => {
    const responses = {
      happy: [
        "That's a fantastic question! 😊 Let me help you with that!",
        "I love your enthusiasm! Here's what I think...",
        "Great thinking! Let me break this down for you in a fun way!"
      ],
      excited: [
        "AMAZING question! 🚀 This is going to be so cool to explore!",
        "Your excitement is contagious! Let's dive deep into this!",
        "WOW! I can't wait to share what I know about this!"
      ],
      calm: [
        "That's a thoughtful question 😌 Let me explain this peacefully...",
        "I appreciate your calm approach to learning. Here's my take...",
        "Let's explore this together at a comfortable pace..."
      ],
      curious: [
        "Ooh, your curiosity is wonderful! 🤔 Let me satisfy that wonder...",
        "I love how you think! Here's something that might interest you...",
        "Your questions always make me think deeper! Here's what I've learned..."
      ],
      tired: [
        "I'll keep this simple and clear for you 😴 Here's the main point...",
        "No worries, let me explain this in an easy way...",
        "Let's make this quick and helpful - here's what you need to know..."
      ],
      confused: [
        "Let me clear that up for you! 💡 Step by step...",
        "I understand the confusion - let me explain this differently...",
        "Don't worry, this is actually simpler than it seems! Here's how..."
      ]
    };

    const moodResponses = responses[mood as keyof typeof responses] || responses.happy;
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: generateBotResponse(inputValue),
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputValue('');
  };

  const quickQuestions = [
    "Help me understand this topic",
    "Create a quiz for me",
    "Explain this concept simply",
    "What should I study next?",
    "I'm feeling stuck"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Your AI Study Buddy</h2>
        <p className="text-lg text-gray-600">
          I'm here to help, encourage, and make learning fun! Ask me anything! 🤖✨
        </p>
      </div>

      <Card className="buddy-card max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Brain className="w-6 h-6 text-blue-500" />
            BrainBuddy Assistant
            <div className="ml-auto flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">AI-Powered</span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-none border'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue(question)}
                  className="text-xs hover:bg-blue-50 hover:border-blue-300"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about your studies..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="buddy-button px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
