
import { useState, useEffect } from 'react';

interface RobotMascotProps {
  mood: string;
}

export const RobotMascot = ({ mood }: RobotMascotProps) => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  const getMoodColor = () => {
    switch (mood) {
      case 'happy': return '#10B981';
      case 'excited': return '#F59E0B';
      case 'calm': return '#3B82F6';
      case 'curious': return '#8B5CF6';
      default: return '#10B981';
    }
  };

  return (
    <div className="relative animate-bounce-gentle">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="drop-shadow-lg"
      >
        {/* Robot Body */}
        <rect
          x="50"
          y="80"
          width="100"
          height="80"
          rx="20"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="3"
        />
        
        {/* Robot Head */}
        <rect
          x="60"
          y="40"
          width="80"
          height="60"
          rx="15"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="3"
        />
        
        {/* Eyes */}
        <circle
          cx="80"
          cy="65"
          r={isBlinking ? "2" : "8"}
          fill={getMoodColor()}
          className="transition-all duration-150"
        />
        <circle
          cx="120"
          cy="65"
          r={isBlinking ? "2" : "8"}
          fill={getMoodColor()}
          className="transition-all duration-150"
        />
        
        {/* Mouth based on mood */}
        {mood === 'happy' && (
          <path
            d="M 85 85 Q 100 95 115 85"
            stroke={getMoodColor()}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}
        {mood === 'excited' && (
          <circle cx="100" cy="85" r="6" fill={getMoodColor()} />
        )}
        {mood === 'calm' && (
          <line
            x1="85"
            y1="85"
            x2="115"
            y2="85"
            stroke={getMoodColor()}
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}
        {mood === 'curious' && (
          <ellipse cx="100" cy="85" rx="8" ry="4" fill={getMoodColor()} />
        )}
        
        {/* Antenna */}
        <line
          x1="100"
          y1="40"
          x2="100"
          y2="25"
          stroke="#64748b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="100" cy="20" r="5" fill={getMoodColor()} className="animate-pulse" />
        
        {/* Arms */}
        <rect
          x="30"
          y="95"
          width="25"
          height="8"
          rx="4"
          fill="#f1f5f9"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        <rect
          x="145"
          y="95"
          width="25"
          height="8"
          rx="4"
          fill="#f1f5f9"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        
        {/* Chest Panel */}
        <rect
          x="75"
          y="100"
          width="50"
          height="30"
          rx="8"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
        
        {/* Chest Buttons */}
        <circle cx="90" cy="115" r="3" fill={getMoodColor()} />
        <circle cx="110" cy="115" r="3" fill="#64748b" />
        
        {/* Legs */}
        <rect
          x="70"
          y="160"
          width="12"
          height="25"
          rx="6"
          fill="#f1f5f9"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        <rect
          x="118"
          y="160"
          width="12"
          height="25"
          rx="6"
          fill="#f1f5f9"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
      </svg>
      
      {/* Speech Bubble */}
      <div className="absolute -top-8 -right-8 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200 animate-pulse-scale">
        <span className="text-2xl">
          {mood === 'happy' && '😊'}
          {mood === 'excited' && '🤩'}
          {mood === 'calm' && '😌'}
          {mood === 'curious' && '🤔'}
        </span>
      </div>
    </div>
  );
};
