"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog";
import { FaCheck, FaTimes, FaCar, FaExclamationTriangle } from 'react-icons/fa';

const trafficQuestions = [
  {
    id: 1,
    question: "What does a yellow traffic light indicate?",
    options: [
      { text: "Speed up to cross quickly" },
      { text: "Prepare to stop safely" },
      { text: "Keep driving normally" },
      { text: "Turn right is allowed" }
    ],
    answer: { text: "Prepare to stop safely" },
    explanation: "A yellow light means the signal is about to turn red. You should prepare to stop safely if you can do so."
  },
  {
    id: 2,
    question: "What is the standard speed limit in a residential area?",
    options: [
      { text: "40 mph (64 km/h)" },
      { text: "30 mph (48 km/h)" },
      { text: "25 mph (40 km/h)" },
      { text: "35 mph (56 km/h)" }
    ],
    answer: { text: "25 mph (40 km/h)" },
    explanation: "The standard speed limit in most residential areas is 25 mph to ensure safety of pedestrians and residents."
  },
  {
    id: 3,
    question: "When should you use your headlights?",
    options: [
      { text: "Only at night" },
      { text: "When it's completely dark" },
      { text: "From sunset to sunrise and in poor visibility conditions" },
      { text: "Only in rain" }
    ],
    answer: { text: "From sunset to sunrise and in poor visibility conditions" },
    explanation: "Headlights should be used from sunset to sunrise and whenever visibility is poor (rain, fog, snow, etc.)."
  },
  {
    id: 4,
    question: "What should you do when approaching a school bus with flashing red lights?",
    options: [
      { text: "Pass quickly on the left" },
      { text: "Stop completely until the lights stop flashing" },
      { text: "Slow down but continue driving" },
      { text: "Honk and proceed carefully" }
    ],
    answer: { text: "Stop completely until the lights stop flashing" },
    explanation: "You must stop completely when a school bus has its red lights flashing and remain stopped until the lights stop."
  },
  {
    id: 5,
    question: "What does a solid white line between lanes mean?",
    options: [
      { text: "Passing is encouraged" },
      { text: "Lane changing is discouraged" },
      { text: "Carpool lane boundary" },
      { text: "Construction zone ahead" }
    ],
    answer: { text: "Lane changing is discouraged" },
    explanation: "A solid white line between lanes indicates that lane changes are discouraged but not illegal."
  }
];

const AccidentAnimation = ({ mistakes }) => {
  const progress = (mistakes / 5) * 100;
  
  return (
    <div className="relative w-32 h-32">
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: mistakes > 0 ? [0, -5, 5, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.div
            className="absolute"
            animate={{
              x: mistakes === 5 ? [0, 100, 150] : 0,
              y: mistakes === 5 ? [0, -20, 50] : 0,
              rotate: mistakes === 5 ? [0, -45, -90] : 0,
            }}
            transition={{ duration: 1 }}
          >
            <FaCar className={`w-12 h-12 ${mistakes === 5 ? 'text-red-600' : 'text-blue-500'}`} />
          </motion.div>
          {mistakes === 5 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 left-0"
            >
              <FaExclamationTriangle className="w-12 h-12 text-yellow-500" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function TrafficQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [points, setPoints] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    
    setSelectedOption(option.text);
    
    if (option.text === trafficQuestions[currentQuestion].answer.text) {
      setPoints(points + 20);
      setAlertMessage("Correct! Well done!");
      setShowAlert(true);
      setProgress(((currentQuestion + 1) / trafficQuestions.length) * 100);
    } else {
      setMistakes(mistakes + 1);
      if (mistakes + 1 >= 5) {
        setAlertMessage("Game Over! Too many mistakes. Start over?");
        setShowAlert(true);
        setTimeout(() => resetQuiz(), 2000);
      } else {
        setAlertMessage("Incorrect! Try the next question.");
        setShowAlert(true);
      }
    }
    
    setShowExplanation(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setMistakes(0);
    setPoints(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setProgress(0);
  };

  const handleNext = () => {
    if (currentQuestion < trafficQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setAlertMessage(`Quiz completed! You scored ${points} points!`);
      setShowAlert(true);
      setTimeout(() => resetQuiz(), 2000);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Traffic Rules Quiz</h1>

      <div className="flex justify-between items-start mb-6">
        <AccidentAnimation mistakes={mistakes} />
        <div className="text-right">
          <p className="font-bold">Mistakes: {mistakes}/5</p>
          <p className="font-bold">Points: {points}/100</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            {currentQuestion + 1}. {trafficQuestions[currentQuestion].question}
          </h2>
          
          <Progress value={progress} className="mb-4" />

          <div className="grid grid-cols-1 gap-2">
            {trafficQuestions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`p-3 rounded-lg text-left ${
                  selectedOption === option.text 
                    ? option.text === trafficQuestions[currentQuestion].answer.text
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={selectedOption !== null}
                animate={
                  selectedOption === option.text && 
                  option.text !== trafficQuestions[currentQuestion].answer.text 
                    ? { x: [0, -10, 10, -10, 10, 0] } 
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                {String.fromCharCode(97 + index)}. {option.text}
                {selectedOption === option.text && (
                  option.text === trafficQuestions[currentQuestion].answer.text 
                    ? <FaCheck className="inline ml-2" />
                    : <FaTimes className="inline ml-2" />
                )}
              </motion.button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                {trafficQuestions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {selectedOption && (
            <Button 
              onClick={handleNext} 
              className="mt-4 w-full"
              disabled={currentQuestion >= trafficQuestions.length - 1 && mistakes >= 5}
            >
              {currentQuestion >= trafficQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setShowAlert(false)}>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}