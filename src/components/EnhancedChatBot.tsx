
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Star, Brain, Sparkles, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EnhancedChatBotProps {
  mood: string;
  userType: 'student' | 'teacher' | 'admin';
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  emotion?: string;
}

export const EnhancedChatBot = ({ mood, userType }: EnhancedChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getEnhancedBotGreeting(mood, userType),
      sender: 'bot',
      timestamp: new Date(),
      emotion: mood
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  function getEnhancedBotGreeting(currentMood: string, currentUserType: string): string {
    const greetings = {
      student: {
        happy: "Hi there, bright learner! 😊 I'm your AI study buddy and I'm SO excited to help you learn amazing things today!",
        excited: "WOW! 🤩 Your energy is incredible! I can't wait to explore the most fascinating topics with you!",
        calm: "Hello, my peaceful friend 😌 I sense your calm energy. Let's learn something beautiful together at your own pace.",
        curious: "Ooh, I can see that wonderful curiosity in you! 🤔 What mysteries of the world shall we uncover today?",
        tired: "Hey there, sleepy scholar 😴 No worries, we'll take it nice and easy. Learning can be gentle and fun!",
        confused: "Hi! 😕 I'm here to help clear up any confusion. We'll work through everything step by step together!"
      },
      teacher: {
        happy: "Hello, dedicated educator! 😊 I'm here to help you create engaging content and track student progress.",
        excited: "Fantastic to meet you! 🤩 Let's create some amazing learning experiences for your students!",
        calm: "Welcome, thoughtful teacher 😌 I'm ready to assist you with curriculum planning and student analytics.",
        curious: "Great to see your curiosity! 🤔 Let me help you discover new ways to engage your students.",
        tired: "Hello! 😴 I understand teaching can be exhausting. Let me help lighten your workload.",
        confused: "Hi there! 😕 I'm here to help you navigate the platform and answer any questions you have."
      }
    };

    const userGreetings = greetings[userType as keyof typeof greetings] || greetings.student;
    return userGreetings[currentMood as keyof typeof userGreetings] || userGreetings.happy;
  }

  const generateEnhancedBotResponse = (userMessage: string): string => {
    const responses = {
      student: {
        happy: [
          "That's such a wonderful question! 😊 Let me help you understand this in the most fun way possible!",
          "I love your enthusiasm! Here's what I think, and I bet you'll find it super interesting!",
          "Great thinking! Let me break this down into bite-sized, delicious pieces of knowledge!"
        ],
        excited: [
          "AMAZING question! 🚀 This is going to blow your mind - are you ready for some serious brain fireworks?",
          "Your excitement is absolutely contagious! Let's dive into this like explorers discovering treasure!",
          "WOW! I can practically see your brain growing! Here's the incredible answer you're looking for!"
        ],
        calm: [
          "That's a very thoughtful question 😌 Let me explain this gently and clearly...",
          "I appreciate your calm, focused approach. Here's my peaceful explanation...",
          "Let's explore this together like a quiet walk through a garden of knowledge..."
        ],
        curious: [
          "Your curiosity makes my circuits sparkle! ✨ Here's something that will feed that wonderful wondering mind...",
          "I LOVE how your brain works! Let me share something that might make you even more curious...",
          "Questions like yours are why I love being an AI teacher! Here's the fascinating answer..."
        ]
      },
      teacher: {
        happy: [
          "Excellent question! Here's a comprehensive answer that might help with your curriculum planning.",
          "I'm happy to help! This information should be useful for your teaching objectives.",
          "Great to assist a fellow educator! Here's what I recommend based on best practices."
        ]
      }
    };

    const userResponses = responses[userType as keyof typeof responses] || responses.student;
    const moodResponses = userResponses[mood as keyof typeof userResponses] || userResponses.happy;
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

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateEnhancedBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
        emotion: mood
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = userType === 'student' 
    ? [
        "Help me understand this topic better",
        "Create a fun quiz for me",
        "Explain this concept simply",
        "What should I study next?",
        "I'm feeling stuck, help!",
        "Make learning fun!"
      ]
    : [
        "Create assignment templates",
        "Generate progress reports",
        "Suggest teaching strategies",
        "Help with curriculum planning",
        "Student engagement tips"
      ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Your Enhanced AI Learning Companion</h2>
        <p className="text-lg text-gray-600">
          I adapt to your emotions, remember our conversations, and provide personalized help! 🤖✨
        </p>
      </div>

      <Card className="buddy-card max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Brain className="w-6 h-6 text-blue-500" />
            BrainBuddy AI Assistant
            <div className="ml-auto flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Heart className="w-3 h-3 mr-1" />
                Emotion-Aware
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none shadow-lg'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-200'
                  }`}
                >
                  {message.sender === 'bot' && message.emotion && (
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 capitalize">
                        Responding to your {message.emotion} mood
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
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
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-md rounded-lg rounded-bl-none border border-gray-200 px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Quick questions for {userType}s:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue(question)}
                  className="text-xs hover:bg-blue-50 hover:border-blue-300 transition-all"
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
              placeholder={`Ask me anything about ${userType === 'student' ? 'your studies' : 'teaching and education'}...`}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 border-2 border-gray-200 focus:border-blue-400"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage} 
              className="buddy-button px-4"
              disabled={isTyping || !inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
