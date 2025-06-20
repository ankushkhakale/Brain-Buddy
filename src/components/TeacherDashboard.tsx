
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, TrendingUp, Settings, FileText, BarChart3, Clock, AlertCircle } from "lucide-react";

interface TeacherDashboardProps {
  isAdmin?: boolean;
}

export const TeacherDashboard = ({ isAdmin = false }: TeacherDashboardProps) => {
  const studentData = [
    { name: "Alice Johnson", level: 4, points: 1850, streak: 12, lastActive: "2 hours ago", progress: 78 },
    { name: "Bob Smith", level: 3, points: 1200, streak: 5, lastActive: "1 day ago", progress: 65 },
    { name: "Charlie Brown", level: 5, points: 2100, streak: 18, lastActive: "30 min ago", progress: 92 },
    { name: "Diana Lee", level: 2, points: 800, streak: 3, lastActive: "3 hours ago", progress: 45 }
  ];

  const classStats = {
    totalStudents: 24,
    activeToday: 18,
    averageScore: 86.5,
    completedQuizzes: 156
  };

  const recentActivity = [
    { student: "Alice", action: "Completed Biology Quiz", score: 94, time: "10 min ago" },
    { student: "Charlie", action: "Started Math Assignment", score: null, time: "25 min ago" },
    { student: "Bob", action: "Achieved 'Quiz Master' badge", score: null, time: "1 hour ago" },
    { student: "Diana", action: "Completed History Quiz", score: 78, time: "2 hours ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          {isAdmin ? "Administrator Dashboard" : "Teacher Dashboard"}
        </h2>
        <p className="text-lg text-gray-600">
          {isAdmin 
            ? "Manage platform settings and monitor overall system performance"
            : "Monitor student progress, create assignments, and track class performance"
          }
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{classStats.totalStudents}</h4>
            <p className="text-gray-600">{isAdmin ? "Total Users" : "Students"}</p>
          </CardContent>
        </Card>

        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{classStats.activeToday}</h4>
            <p className="text-gray-600">Active Today</p>
          </CardContent>
        </Card>

        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{classStats.averageScore}%</h4>
            <p className="text-gray-600">Avg. Score</p>
          </CardContent>
        </Card>

        <Card className="buddy-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{classStats.completedQuizzes}</h4>
            <p className="text-gray-600">Quizzes Done</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Student Performance Table */}
        <Card className="buddy-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              {isAdmin ? "Top Performers" : "Student Performance"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentData.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{student.name}</h4>
                        <p className="text-sm text-gray-600">Level {student.level} • {student.points} points</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{student.progress}%</span>
                      </div>
                      <Progress value={student.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <Badge 
                      variant={student.streak > 10 ? 'default' : 'secondary'}
                      className={student.streak > 10 ? 'bg-orange-500 text-white' : ''}
                    >
                      🔥 {student.streak}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{student.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="buddy-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-6 h-6 text-green-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <strong>{activity.student}</strong> {activity.action}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      {activity.score && (
                        <Badge variant="outline" className="text-xs">
                          {activity.score}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="buddy-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="buddy-button h-auto py-4 flex flex-col items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <span>Create Assignment</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <FileText className="w-6 h-6" />
              <span>Generate Report</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              <span>View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Settings className="w-6 h-6" />
              <span>{isAdmin ? "System Settings" : "Class Settings"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts for Teachers/Admins */}
      {(isAdmin || true) && (
        <Card className="buddy-card border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              {isAdmin ? "System Alerts" : "Attention Needed"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    {isAdmin ? "Server maintenance scheduled for tonight" : "3 students haven't submitted this week's assignment"}
                  </p>
                  <p className="text-xs text-orange-600">
                    {isAdmin ? "Expected downtime: 2-3 hours" : "Consider sending a reminder"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    {isAdmin ? "New feature: Advanced Analytics now available" : "Class average improved by 12% this week!"}
                  </p>
                  <p className="text-xs text-blue-600">
                    {isAdmin ? "Check the admin panel for details" : "Great job motivating your students!"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
