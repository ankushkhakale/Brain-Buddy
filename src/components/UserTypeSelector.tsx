
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, GraduationCap, Shield, Brain } from "lucide-react";

interface UserTypeSelectorProps {
  onUserTypeSelect: (type: 'student' | 'teacher' | 'admin') => void;
}

export const UserTypeSelector = ({ onUserTypeSelect }: UserTypeSelectorProps) => {
  const userTypes = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'I want to learn and have fun with interactive quizzes!',
      icon: User,
      color: 'from-blue-500 to-green-500',
      features: ['Interactive Quizzes', 'AI Chat Buddy', 'Gamification', 'Progress Tracking']
    },
    {
      id: 'teacher' as const,
      title: 'Teacher/Parent',
      description: 'I want to monitor progress and create assignments.',
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-500',
      features: ['Student Analytics', 'Content Creation', 'Progress Reports', 'Assignment Tools']
    },
    {
      id: 'admin' as const,
      title: 'Administrator',
      description: 'I need to manage the platform and users.',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      features: ['User Management', 'Platform Analytics', 'Content Moderation', 'System Settings']
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center animate-bounce-gentle">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BrainBuddy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role to get started with personalized learning experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {userTypes.map((type) => (
            <Card key={type.id} className="buddy-card group cursor-pointer hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mx-auto mb-4 group-hover:animate-wiggle`}>
                  <type.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {type.title}
                </CardTitle>
                <p className="text-gray-600 text-lg">
                  {type.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => onUserTypeSelect(type.id)}
                  className={`w-full buddy-button text-lg py-3 bg-gradient-to-r ${type.color}`}
                >
                  Continue as {type.title} 🚀
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
