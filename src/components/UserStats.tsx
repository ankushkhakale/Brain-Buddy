
import { Badge } from "@/components/ui/badge";
import { Star, Trophy } from "lucide-react";

interface Stats {
  streak: number;
  points: number;
  badges: string[];
  level: number;
}

interface UserStatsProps {
  stats: Stats;
}

export const UserStats = ({ stats }: UserStatsProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* Points */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
          <Star className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-gray-800">{stats.points.toLocaleString()}</span>
      </div>

      {/* Level */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <Trophy className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-gray-800">Lv.{stats.level}</span>
      </div>

      {/* Streak */}
      <Badge className="bg-orange-500 text-white px-3 py-1">
        🔥 {stats.streak} day streak
      </Badge>
    </div>
  );
};
