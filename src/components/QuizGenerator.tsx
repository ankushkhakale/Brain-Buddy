
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizGeneratorProps {
  mood: string;
}

export const QuizGenerator = ({ mood }: QuizGeneratorProps) => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizGenerated, setQuizGenerated] = useState(false);

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadedFile("sample-notes.pdf");
    setTimeout(() => {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setQuizGenerated(true);
      }, 3000);
    }, 500);
  };

  const getMoodMessage = () => {
    switch (mood) {
      case 'happy': return "Let's make some fun quizzes! 😊";
      case 'excited': return "Wow! Ready for an amazing learning adventure? 🚀";
      case 'calm': return "Take your time, we'll create something peaceful together 🌊";
      case 'curious': return "I love your curiosity! Let's explore together 🔍";
      case 'tired': return "No worries! Let's make this easy and fun 😴";
      case 'confused': return "Don't worry, I'm here to help make things clear! 💡";
      default: return "Let's start learning together!";
    }
  };

  const sampleQuestions = [
    {
      question: "What is the primary function of mitochondria in cells?",
      options: ["Energy production", "Protein synthesis", "DNA storage", "Waste removal"],
      correct: 0,
      difficulty: "Easy"
    },
    {
      question: "Which process converts glucose into ATP?",
      options: ["Photosynthesis", "Cellular respiration", "Osmosis", "Diffusion"],
      correct: 1,
      difficulty: "Medium"
    },
    {
      question: "What organelle is known as the 'powerhouse of the cell'?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
      correct: 2,
      difficulty: "Easy"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">AI Quiz Generator</h2>
        <p className="text-lg text-gray-600">{getMoodMessage()}</p>
      </div>

      {!uploadedFile && (
        <Card className="buddy-card max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-gray-800">
              Upload Your Study Materials
            </CardTitle>
            <p className="text-gray-600">
              Upload PDFs, images, or notes and I'll create personalized quizzes for you!
            </p>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="font-medium text-blue-700">PDFs & Documents</p>
                <p className="text-sm text-blue-600">Upload your study notes</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Image className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium text-green-700">Images & Screenshots</p>
                <p className="text-sm text-green-600">Upload textbook pages</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <FileText className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="font-medium text-purple-700">Handwritten Notes</p>
                <p className="text-sm text-purple-600">Upload your handwriting</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isGenerating && (
        <Card className="buddy-card max-w-2xl mx-auto">
          <CardContent className="text-center py-8">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Creating Your Perfect Quiz! 🎯
            </h3>
            <p className="text-gray-600">
              Analyzing your content and generating personalized questions...
            </p>
          </CardContent>
        </Card>
      )}

      {quizGenerated && (
        <div className="space-y-6">
          <Card className="buddy-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800">
                  Quiz Generated! 🎉
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Clock className="w-4 h-4 mr-1" />
                    15 mins
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    3 Questions
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600">
                Based on your uploaded content: <strong>{uploadedFile}</strong>
              </p>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {sampleQuestions.map((question, index) => (
              <Card key={index} className="buddy-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-800">
                      Question {index + 1}
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
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="buddy-button text-lg px-8 py-4">
              Start Quiz! 🚀
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
