"use client";

import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { useQuestionnaireStore } from "@/store/useQuestionnaireStore";
import { useRouter } from "next/navigation";
import { useGetRole } from "@/lib/hooks/useRole";
import { usePostPayPower } from "@/lib/hooks/usePayPower";
import { useState } from "react";
import Link from "next/link";

interface Question {
  id: string;
  question: string;
  type: string;
  options: string[];
}

export default function QuestionnairePage() {
  const {
    currentStep,
    setCurrentStep,
    setAnswer,
    answers,
    email,
    setEmail,
    setScoreResults,
  } = useQuestionnaireStore();

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

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
        "Large City (LA, Chicago, Houston, Phoenix, Philadelphia)",
        "Upper Mid-size City (San Diego, Dallas, San Jose, San Antonio, San Francisco)",
        "Mid-size City (Denver, Boston, Atlanta, Miami, Orlando, Tampa)",
        "Growing Tech City (Austin, Raleigh, Durham, Boulder, Salt Lake City)",
        "College Town (Berkeley, Palo Alto, Cambridge, Ann Arbor, Madison)",
        "Small City (Boise, Reno, Spokane, Santa Fe, Flagstaff)",
        "Rural Area / Small Town",
        "Remote (Anywhere in the US)",
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

  const handleSelect = (value: string) => {
    const currentQ = questions[currentStep];
    if (currentQ) setAnswer(currentQ.id, value);
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
      setSearchTerm("");
    }
  };

  const { data: roleData, isLoading: roleLoading } = useGetRole();
  const { mutateAsync: postPayPower, isPending: isSubmitting } =
    usePostPayPower();

  const handleEmailSubmit = async () => {
    if (!email.trim()) return;

    const payload = {
      currentRole: answers.role,
      experience: answers.experience,
      location: answers.location,
      compensation: answers.currentPay,
      lastRaise: answers.lastRaise,
      negotiateCurrentSalary: answers.negotiated,
      discussTime: answers.askFrequency,
      howConfident: answers.marketAwareness,
      email: email,
    };

    try {
      // post pay power
      const response = await postPayPower(payload);

      if (response && response.success && response.data) {
        setScoreResults(
          response.data.payPowerScore,
          response.data.marketGapDetected,
          response.data.user_selection_id
        );
      }
      // 2️ Navigate to /score
      router.push(`/score`);
    } catch (error) {
      console.error("Failed to submit:", error);
      // Optional: Show error toast here
    }
  };

  if (currentStep === questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#005DAA]/10 to-[#00C8B3]/10 overflow-hidden p-4">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div
            className="absolute w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 
          bg-[#005DAA] rounded-full blur-3xl -top-10 -left-10"
          ></div>

          <div
            className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 
          bg-[#00C8B3] rounded-full blur-3xl bottom-0 right-0"
          ></div>
        </div>
        <div className="max-w-xl mx-auto pt-12 pb-20">
          {/* BRAND, TITLE & DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Link href="/">
              <span className="inline-block bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white px-6 py-2.5 rounded-full font-bold text-xl shadow-md mb-6 cursor-pointer">
                COMPanion
              </span>
            </Link>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Your Pay Power Assessment
            </h2>
            <p className="text-gray-700 text-base md:text-lg max-w-xl mx-auto">
              Answer a few quick questions to calculate your personalized Pay
              Power Score.
            </p>
          </motion.div>

          {/* EMAIL INPUT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl shadow-2xl p-10"
          >
            <div className="space-y-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                placeholder="your.email@company.com"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#00C8B3] focus:ring-1 focus:ring-[#00C8B3]/80 outline-none transition"
              />
              <button
                onClick={handleEmailSubmit}
                disabled={!email.trim() || isSubmitting}
                className={`w-full py-4 rounded-2xl font-semibold transition  
                  ${
                    !email.trim() || isSubmitting
                      ? "w-full bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md cursor-not-allowed opacity-70"
                      : "w-full bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  }
                `}
              >
                {isSubmitting ? "Processing..." : "Show My Score"}
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <Link
                href="/privacy-policy"
                className="hover:text-[#005DAA] transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>

              <span className="hidden sm:inline text-gray-300">|</span>

              <Link
                href="/terms-conditions"
                className="hover:text-[#00C8B3] transition-colors underline-offset-4 hover:underline"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const q = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  // Logic to determine which options to show
  let displayedOptions = q.options;

  if (q.id === "role") {
    // If we have fetched roles, use them. Otherwise fallback to default options.
    const sourceOptions =
      roleData?.data && Array.isArray(roleData.data)
        ? roleData.data
        : q.options;

    // Filter based on search term
    if (searchTerm.trim()) {
      displayedOptions = sourceOptions.filter((opt: string) =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      displayedOptions = sourceOptions;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005DAA]/10 to-[#00C8B3]/10 overflow-hidden p-4">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 
          bg-[#005DAA] rounded-full blur-3xl -top-10 -left-10"
        ></div>

        <div
          className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 
          bg-[#00C8B3] rounded-full blur-3xl bottom-0 right-0"
        ></div>
      </div>
      <div className="max-w-2xl mx-auto pt-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Link href="/">
            <span className="inline-block bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white px-6 py-2.5 rounded-full font-bold text-xl shadow-md mb-6 cursor-pointer">
              COMPanion
            </span>
          </Link>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Your Pay Power Assessment
          </h2>
          <p className="text-gray-700 text-base md:text-lg max-w-xl mx-auto">
            Answer a few quick questions to calculate your personalized Pay
            Power Score.
          </p>
        </motion.div>

        {/* STEP ICONS */}
        <div className="flex justify-between relative mb-14">
          {questions.map((_, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={index}
                className="flex flex-col items-center w-full select-none"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    opacity: 1,
                    boxShadow: isActive
                      ? "0 0 20px rgba(99,102,241,0.45)"
                      : isCompleted
                        ? "0 0 12px rgba(99,102,241,0.25)"
                        : "none",
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`
                    w-12 h-12 flex items-center justify-center rounded-full text-sm font-semibold border-2
                    ${
                      isActive || isCompleted
                        ? "bg-[#00C8B3] text-white border-[#FFF]"
                        : "bg-white text-gray-500 border-gray-300"
                    }
                  `}
                >
                  {isCompleted ? <Check size={20} /> : index + 1}
                </motion.div>
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
              className="bg-gradient-to-r from-[#005DAA] to-[#00C8B3] h-2 rounded-full"
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
          className="bg-white rounded-3xl shadow-2xl p-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {q.question}
          </h2>

          {/* SEARCH BAR FOR ROLE */}
          {q.id === "role" && (
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for your role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-left p-3 pl-10 border-2 border-gray-200 rounded-xl
                  focus:border-[#005DAA] focus:ring-1 focus:ring-[#005DAA]/50 outline-none
                  transition duration-200 font-medium text-gray-800"
              />
            </div>
          )}

          <div
            className={`space-y-4 ${q.id === "role" ? "max-h-96 overflow-y-auto custom-scrollbar pr-2 " : ""}`}
          >
            {q.id === "role" && roleLoading ? (
              <div className="text-gray-500 italic">Loading roles...</div>
            ) : displayedOptions.length > 0 ? (
              displayedOptions.map((option) => (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(option)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-2xl
                  hover:border-[#005DAA] hover:bg-[#005DAA]/10 transition duration-200
                  font-medium text-gray-800 cursor-pointer"
                >
                  {option}
                </motion.button>
              ))
            ) : (
              <div className="text-gray-500 italic">No role found.</div>
            )}
          </div>
        </motion.div>

        {/* BACK BUTTON */}
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-2xl border border-[#005DAA]
              text-gray-700 font-medium hover:bg-[#005DAA] hover:text-white transition-all duration-200 cursor-pointer"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
