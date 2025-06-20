
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Image, Clock, Star, Settings, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface EnhancedQuizGeneratorProps {
  mood: string;
  userType: 'student' | 'teacher' | 'admin';
}

export const EnhancedQuizGenerator = ({ mood, userType }: EnhancedQuizGeneratorProps) => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    difficulty: 'medium',
    questionCount: 15,
    questionTypes: ['mcq', 'tf'],
    includeExplanations: true,
    timeLimit: 20,
    contentType: 'quiz'
  });

  const handleFileUpload = () => {
    setUploadedFile("advanced-biology-notes.pdf");
    setTimeout(() => {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setQuizGenerated(true);
      }, 4000);
    }, 500);
  };

  const getMoodMessage = () => {
    switch (mood) {
      case 'happy': return "Let's create some amazing quizzes together! 😊";
      case 'excited': return "Wow! Ready for an incredible learning adventure? 🚀";
      case 'calm': return "Take your time, we'll build something wonderful together 🌊";
      case 'curious': return "I love your curiosity! Let's explore and create 🔍";
      default: return "Let's start creating personalized learning content!";
    }
  };

  const sampleQuestions = [
    {
      question: "What is the primary function of mitochondria in cellular respiration?",
      options: ["ATP production through oxidative phosphorylation", "Protein synthesis", "DNA replication", "Lipid storage"],
      correct: 0,
      difficulty: "Medium",
      explanation: "Mitochondria are the powerhouses of the cell, primarily responsible for producing ATP through the process of oxidative phosphorylation during cellular respiration."
    },
    {
      question: "Which enzyme breaks down hydrogen peroxide in cells?",
      options: ["Catalase", "Pepsin", "Amylase", "Lipase"],
      correct: 0,
      difficulty: "Hard",
      explanation: "Catalase is an enzyme found in nearly all organisms that breaks down hydrogen peroxide (H₂O₂) into water and oxygen, protecting cells from oxidative damage."
    },
    {
      question: "Photosynthesis occurs in which part of the plant cell?",
      options: ["Nucleus", "Mitochondria", "Chloroplasts", "Ribosomes"],
      correct: 2,
      difficulty: "Easy",
      explanation: "Chloroplasts contain chlorophyll and are the sites where photosynthesis occurs, converting light energy into chemical energy."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Enhanced Quiz Generator</h2>
        <p className="text-lg text-gray-600">{getMoodMessage()}</p>
      </div>

      {!uploadedFile && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* File Upload Section */}
          <Card className="buddy-card">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Upload className="w-6 h-6" />
                Upload Learning Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <Button onClick={handleFileUpload} className="buddy-button">
                  Choose Files 📁
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-medium text-blue-700">PDFs & Docs</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Image className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium text-green-700">Images & Notes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Settings */}
          <Card className="buddy-card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Quiz Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={quizSettings.difficulty} onValueChange={(value) => setQuizSettings({...quizSettings, difficulty: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy - Basic concepts</SelectItem>
                    <SelectItem value="medium">Medium - Standard level</SelectItem>
                    <SelectItem value="hard">Hard - Advanced topics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="questionCount">Number of Questions</Label>
                <Input
                  id="questionCount"
                  type="number"
                  min="5"
                  max="50"
                  value={quizSettings.questionCount}
                  onChange={(e) => setQuizSettings({...quizSettings, questionCount: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-2">
                <Label>Question Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mcq" defaultChecked />
                    <Label htmlFor="mcq">Multiple Choice</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tf" defaultChecked />
                    <Label htmlFor="tf">True/False</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fill" />
                    <Label htmlFor="fill">Fill in the blanks</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select value={quizSettings.contentType} onValueChange={(value) => setQuizSettings({...quizSettings, contentType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Interactive Quiz</SelectItem>
                    <SelectItem value="flowchart">Concept Flowchart</SelectItem>
                    <SelectItem value="summary">Study Summary</SelectItem>
                    <SelectItem value="flashcards">Digital Flashcards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isGenerating && (
        <Card className="buddy-card max-w-2xl mx-auto">
          <CardContent className="text-center py-8">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              🧠 AI is analyzing your content...
            </h3>
            <p className="text-gray-600 mb-4">
              Creating {quizSettings.questionCount} personalized questions at {quizSettings.difficulty} difficulty
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Star className="w-4 h-4" />
                <span className="text-sm">Processing with advanced AI algorithms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {quizGenerated && (
        <div className="space-y-6">
          <Card className="buddy-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800">
                  🎉 Your Personalized Quiz is Ready!
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Clock className="w-4 h-4 mr-1" />
                    {quizSettings.timeLimit} mins
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {quizSettings.questionCount} Questions
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {quizSettings.difficulty.charAt(0).toUpperCase() + quizSettings.difficulty.slice(1)}
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600">
                Generated from: <strong>{uploadedFile}</strong> • AI-powered content analysis
              </p>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {sampleQuestions.slice(0, 3).map((question, index) => (
              <Card key={index} className="buddy-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-800">
                      Question {index + 1} of {quizSettings.questionCount}
                    </CardTitle>
                    <Badge
                      variant={question.difficulty === 'Easy' ? 'default' : 'secondary'}
                      className={
                        question.difficulty === 'Easy'
                          ? 'bg-green-500 text-white'
                          : question.difficulty === 'Medium'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-red-500 text-white'
                      }
                    >
                      {question.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-800 font-medium text-lg">
                    {question.question}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant="outline"
                        className="text-left justify-start p-4 h-auto hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                      >
                        <span className="font-semibold mr-2 text-blue-500">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                      </Button>
                    ))}
                  </div>
                  {quizSettings.includeExplanations && (
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm text-green-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="buddy-button text-lg px-8 py-4 mr-4">
              <Play className="w-5 h-5 mr-2" />
              Start Full Quiz ({quizSettings.questionCount} questions)
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4">
              Preview All Questions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
