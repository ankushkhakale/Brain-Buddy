
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MoodCheckInProps {
  onMoodChange: (mood: string) => void;
  currentMood: string;
}

export const MoodCheckIn = ({ onMoodChange, currentMood }: MoodCheckInProps) => {
  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', color: 'bg-green-500' },
    { id: 'excited', emoji: '🤩', label: 'Excited', color: 'bg-orange-500' },
    { id: 'calm', emoji: '😌', label: 'Calm', color: 'bg-blue-500' },
    { id: 'curious', emoji: '🤔', label: 'Curious', color: 'bg-purple-500' },
    { id: 'tired', emoji: '😴', label: 'Tired', color: 'bg-gray-500' },
    { id: 'confused', emoji: '😕', label: 'Confused', color: 'bg-yellow-500' }
  ];

  return (
    <Card className="buddy-card max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <span>How are you feeling today?</span>
          <span className="animate-wiggle">🎭</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {moods.map((mood) => (
            <Button
              key={mood.id}
              onClick={() => onMoodChange(mood.id)}
              variant={currentMood === mood.id ? "default" : "outline"}
              className={`flex flex-col items-center gap-2 h-20 transition-all duration-300 hover:scale-105 ${
                currentMood === mood.id
                  ? `${mood.color} text-white shadow-lg animate-pulse-scale`
                  : 'border-2 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>
        
        {currentMood && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-700">
              Great! I'll adjust my responses to match your{' '}
              <span className="font-semibold">
                {moods.find(m => m.id === currentMood)?.label.toLowerCase()}
              </span>{' '}
              mood! 🤖✨
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
