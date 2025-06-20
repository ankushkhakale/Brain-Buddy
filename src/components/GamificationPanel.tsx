
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Star, Calendar } from "lucide-react";

interface Stats {
  streak: number;
  points: number;
  badges: string[];
  level: number;
}

interface GamificationPanelProps {
  stats: Stats;
}

export const GamificationPanel = ({ stats }: GamificationPanelProps) => {
  const achievements = [
    { name: 'Quick Learner', icon: '⚡', description: 'Complete 5 quizzes in a day' },
    { name: 'Quiz Master', icon: '🎯', description: 'Score 100% on 3 consecutive quizzes' },
    { name: 'Curious Mind', icon: '🤔', description: 'Ask 20 questions to the AI buddy' },
    { name: 'Streak Champion', icon: '🔥', description: 'Maintain a 7-day learning streak' }
  ];

  const nextLevelPoints = (stats.level + 1) * 500;
  const progressPercentage = ((stats.points % 500) / 500) * 100;

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Learning Journey</h3>
        <p className="text-gray-600">Keep up the amazing work! 🌟</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Streak Counter */}
        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{stats.streak}</h4>
            <p className="text-gray-600">Day Streak 🔥</p>
          </CardContent>
        </Card>

        {/* Points */}
        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{stats.points.toLocaleString()}</h4>
            <p className="text-gray-600">Brain Points ⭐</p>
          </CardContent>
        </Card>

        {/* Level */}
        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">Level {stats.level}</h4>
            <p className="text-gray-600">Learning Level 🏆</p>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{stats.badges.length}</h4>
            <p className="text-gray-600">Badges Earned 🎖️</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="buddy-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Level {stats.level}</span>
            <span>{nextLevelPoints - (stats.points % 500)} points to Level {stats.level + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="buddy-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  stats.badges.includes(achievement.name)
                    ? 'border-green-300 bg-green-50 shadow-md'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h5 className="font-bold text-gray-800">{achievement.name}</h5>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {stats.badges.includes(achievement.name) && (
                    <Badge className="ml-auto bg-green-500 text-white">
                      Earned! ✅
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
