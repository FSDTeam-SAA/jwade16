"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Question {
  id: string;
  question: string;
  type: string;
  options: string[];
}

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions: Question[] = [
    {
      id: "role",
      question: "What is your current role?",
      type: "select",
      options: [
        "Software Engineer",
        "Product Manager",
        "Designer",
        "Marketing",
        "Sales",
        "Data Analyst",
        "HR",
        "Finance",
        "Operations",
        "Other",
      ],
    },
    {
      id: "experience",
      question: "Years of professional experience?",
      type: "select",
      options: [
        "0-2 years",
        "3-5 years",
        "6-10 years",
        "11-15 years",
        "16+ years",
      ],
    },
    {
      id: "location",
      question: "Where are you located?",
      type: "select",
      options: [
        "Major Tech Hub (SF, NYC, Seattle)",
        "Large City",
        "Mid-size City",
        "Small City/Rural",
        "Remote",
      ],
    },
    {
      id: "currentPay",
      question: "Current annual compensation?",
      type: "select",
      options: [
        "Under $50k",
        "$50k-$75k",
        "$75k-$100k",
        "$100k-$150k",
        "$150k-$200k",
        "$200k-$300k",
        "$300k+",
      ],
    },
    {
      id: "lastRaise",
      question: "When was your last raise?",
      type: "select",
      options: [
        "Within 6 months",
        "6-12 months ago",
        "1-2 years ago",
        "2-3 years ago",
        "3+ years ago",
        "Never received a raise",
      ],
    },
    {
      id: "negotiated",
      question: "Did you negotiate your current salary?",
      type: "select",
      options: [
        "Yes, successfully",
        "Yes, but accepted first offer",
        "No, accepted first offer",
        "No, negotiation not allowed",
      ],
    },
    {
      id: "askFrequency",
      question: "How often do you discuss compensation with your manager?",
      type: "select",
      options: [
        "Every review cycle",
        "Once a year",
        "Every few years",
        "Only when changing jobs",
        "Never initiated",
      ],
    },
    {
      id: "marketAwareness",
      question: "How confident are you about market rates for your role?",
      type: "select",
      options: [
        "Very confident - I research regularly",
        "Somewhat confident",
        "Not very confident",
        "No idea",
      ],
    },
  ];

  const q = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [q.id]: value });

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-10 pb-20">
        {/* STEP INDICATOR - PREMIUM MINIMAL STYLE */}
        {/* --------------------------------------- */}

        <div className="relative mb-16">
          {/* TOP TITLE + DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold text-xl shadow-md tracking-wide mb-4">
              COMPanion
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
              Your Pay Power Assessment
            </h2>
            <p className="text-gray-700 text-base md:text-lg max-w-xl mx-auto">
              Answer a few quick questions to calculate your personalized Pay
              Power Score.
            </p>
          </motion.div>

          {/* --------------------------------------- */}
          {/* STEP ICONS */}
          {/* --------------------------------------- */}
          <div className="flex justify-between relative">
            {questions.map((_, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center w-full select-none"
                >
                  {/* Step Circle */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      opacity: 1,
                      boxShadow: isActive
                        ? "0 0 20px rgba(99,102,241,0.45)"
                        : isCompleted
                          ? "0 0 10px rgba(99,102,241,0.25)"
                          : "none",
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`
              w-12 h-12 flex items-center justify-center rounded-full text-sm font-semibold 
              transition-all duration-300 border-2
              ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : isCompleted
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-300"
              }
            `}
                  >
                    {isCompleted ? <Check size={20} /> : index + 1}
                  </motion.div>

                  {/* Step Label */}
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 text-xs font-medium text-gray-600"
                  >
                    Step {index + 1}
                  </motion.p>
                </div>
              );
            })}
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-10 -mt-12">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentStep + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-indigo-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* QUESTION CARD */}
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {q.question}
          </h2>

          <div className="space-y-3">
            {q.options.map((option) => (
              <motion.button
                key={option}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(option)}
                className="w-full text-left p-4 border-2 border-gray-200 rounded-xl
                hover:border-indigo-600 hover:bg-indigo-50 transition duration-200
                font-medium text-gray-800 cursor-pointer"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* BACK BUTTON */}
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="
      mt-6 inline-flex items-center gap-2 px-4 py-2
      rounded-xl border border-indigo-600
      text-gray-700 font-medium
      hover:bg-indigo-600 hover:text-white hover:border-indigo-600
      transition-all duration-200 cursor-pointer
    "
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
