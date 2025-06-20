
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Calendar, BookOpen, Target, TrendingUp, Award, Users } from "lucide-react";

interface StudentDashboardProps {
  stats: {
    streak: number;
    points: number;
    badges: string[];
    level: number;
  };
  mood: string;
}

export const StudentDashboard = ({ stats, mood }: StudentDashboardProps) => {
  const recentQuizzes = [
    { subject: "Biology", score: 92, date: "Today", difficulty: "Medium" },
    { subject: "Mathematics", score: 88, date: "Yesterday", difficulty: "Hard" },
    { subject: "History", score: 95, date: "2 days ago", difficulty: "Easy" }
  ];

  const weeklyProgress = [
    { day: "Mon", quizzes: 3, points: 150 },
    { day: "Tue", quizzes: 2, points: 120 },
    { day: "Wed", quizzes: 4, points: 200 },
    { day: "Thu", quizzes: 1, points: 80 },
    { day: "Fri", quizzes: 3, points: 180 },
    { day: "Sat", quizzes: 2, points: 100 },
    { day: "Sun", quizzes: 5, points: 250 }
  ];

  const nextLevelPoints = (stats.level + 1) * 500;
  const progressPercentage = ((stats.points % 500) / 500) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Your Learning Dashboard</h2>
        <p className="text-lg text-gray-600">
          Track your progress, celebrate achievements, and discover new learning paths! 📈
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800">{stats.streak}</h4>
            <p className="text-gray-600 text-sm">Day Streak 🔥</p>
          </CardContent>
        </Card>

        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800">Lv.{stats.level}</h4>
            <p className="text-gray-600 text-sm">Current Level</p>
          </CardContent>
        </Card>

        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800">{stats.points.toLocaleString()}</h4>
            <p className="text-gray-600 text-sm">Total Points</p>
          </CardContent>
        </Card>

        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800">{stats.badges.length}</h4>
            <p className="text-gray-600 text-sm">Badges Earned</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Level Progress */}
        <Card className="buddy-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Level {stats.level}</span>
              <span>{nextLevelPoints - (stats.points % 500)} points to Level {stats.level + 1}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                🎯 <strong>Next Goal:</strong> Complete 3 more quizzes to unlock new avatar accessories!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Quiz Performance */}
        <Card className="buddy-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              Recent Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentQuizzes.map((quiz, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">{quiz.subject}</h4>
                    <p className="text-sm text-gray-600">{quiz.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={quiz.score >= 90 ? 'default' : 'secondary'}
                        className={quiz.score >= 90 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}
                      >
                        {quiz.score}%
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {quiz.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card className="buddy-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-500" />
            This Week's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
                <div 
                  className="bg-gradient-to-t from-blue-500 to-green-500 rounded-lg mx-auto mb-2"
                  style={{ 
                    height: `${Math.max(20, (day.points / 250) * 60)}px`,
                    width: '100%'
                  }}
                ></div>
                <div className="text-xs text-gray-500">{day.quizzes} quizzes</div>
                <div className="text-xs font-medium text-gray-700">{day.points}pts</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Mood & Recommendations */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="buddy-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">😊</span>
              Current Mood: {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Based on your {mood} mood, here are some personalized recommendations:
            </p>
            <div className="space-y-2">
              {mood === 'happy' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Try challenging quizzes to boost your confidence!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Explore new subjects while you're feeling great!</span>
                  </div>
                </>
              )}
              {mood === 'excited' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Channel that energy into speed quizzes!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Try collaborative learning with friends!</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="buddy-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="buddy-button h-auto py-3 flex flex-col items-center gap-1">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm">New Quiz</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-1">
                <Users className="w-5 h-5" />
                <span className="text-sm">Study Group</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-1">
                <Trophy className="w-5 h-5" />
                <span className="text-sm">Leaderboard</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-1">
                <Award className="w-5 h-5" />
                <span className="text-sm">Achievements</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
