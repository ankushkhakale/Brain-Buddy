
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Star, Upload, MessageCircle, Target, Trophy, User, Settings } from "lucide-react";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { EnhancedQuizGenerator } from "@/components/EnhancedQuizGenerator";
import { EnhancedChatBot } from "@/components/EnhancedChatBot";
import { RobotMascot } from "@/components/RobotMascot";
import { GamificationPanel } from "@/components/GamificationPanel";
import { UserStats } from "@/components/UserStats";
import { UserTypeSelector } from "@/components/UserTypeSelector";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TeacherDashboard } from "@/components/TeacherDashboard";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [userMood, setUserMood] = useState<string>('happy');
  const [userType, setUserType] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [userStats] = useState({
    streak: 7,
    points: 1250,
    badges: ['Quick Learner', 'Quiz Master', 'Curious Mind'],
    level: 3
  });

  const features = [
    {
      icon: Upload,
      title: "Smart Content Upload",
      description: "Upload PDFs, images, notes, or videos and watch AI create 15+ personalized quiz questions!",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: MessageCircle,
      title: "AI Learning Buddy",
      description: "Chat with your intelligent companion that understands your emotions and learning style!",
      color: "from-green-500 to-blue-500"
    },
    {
      icon: Target,
      title: "Adaptive Quizzes",
      description: "Choose difficulty levels, question types, and get instant feedback with detailed explanations!",
      color: "from-orange-500 to-pink-500"
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Earn XP, unlock avatars, complete quests, and climb leaderboards while you learn!",
      color: "from-purple-500 to-green-500"
    }
  ];

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <UserTypeSelector onUserTypeSelect={setUserType} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                BrainBuddy
              </h1>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </Badge>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {['home', 'quiz', 'chat', 'dashboard'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeSection === section
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <UserStats stats={userStats} />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUserType(null)}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Switch User
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6">
              <div className="flex justify-center">
                <RobotMascot mood={userMood} />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-800">
                  Learn Like You{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-pulse-scale">
                    Play!
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Welcome to BrainBuddy - where AI meets education! 
                  Upload any content and transform it into engaging quizzes, flowcharts, and summaries.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setActiveSection('quiz')}
                  className="buddy-button text-lg px-8 py-4"
                >
                  Start Learning Now! 🚀
                </Button>
                <Button 
                  onClick={() => setActiveSection('chat')}
                  variant="outline" 
                  className="text-lg px-8 py-4 border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  Meet Your AI Buddy 🤖
                </Button>
              </div>
            </section>

            {/* Mood Check-in */}
            <section className="flex justify-center">
              <MoodCheckIn onMoodChange={setUserMood} currentMood={userMood} />
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="buddy-card group cursor-pointer">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:animate-wiggle`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-lg">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Gamification Panel */}
            <GamificationPanel stats={userStats} />
          </div>
        )}

        {activeSection === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <EnhancedQuizGenerator mood={userMood} userType={userType} />
          </div>
        )}

        {activeSection === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <EnhancedChatBot mood={userMood} userType={userType} />
          </div>
        )}

        {activeSection === 'dashboard' && (
          <div className="max-w-6xl mx-auto">
            {userType === 'student' && <StudentDashboard stats={userStats} mood={userMood} />}
            {userType === 'teacher' && <TeacherDashboard />}
            {userType === 'admin' && <TeacherDashboard isAdmin />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Made with ❤️ for young learners everywhere
            </p>
            <p className="text-sm text-gray-500 mt-2">
              BrainBuddy - Where Education Meets Innovation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
