"use client";

import { useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  Award,
  DollarSign,
  Target,
  Share2,
  Lock,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  type: string;
  options: string[];
}

interface Answers {
  [key: string]: string;
}

export default function PayPowerScore() {
  const [stage, setStage] = useState<string>("landing");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);

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
        "Yes, but accepted first offer anyway",
        "No, accepted first offer",
        "No, was told no negotiation allowed",
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

  const calculateScore = (answers: Answers): number => {
    let baseScore = 50;

    const expBoosts: { [key: string]: number } = {
      "0-2 years": 0,
      "3-5 years": 5,
      "6-10 years": 10,
      "11-15 years": 12,
      "16+ years": 15,
    };
    baseScore += expBoosts[answers.experience] || 0;

    const locBoosts: { [key: string]: number } = {
      "Major Tech Hub (SF, NYC, Seattle)": 10,
      "Large City": 5,
      "Mid-size City": 0,
      "Small City/Rural": -5,
      Remote: 5,
    };
    baseScore += locBoosts[answers.location] || 0;

    const raiseBoosts: { [key: string]: number } = {
      "Within 6 months": 15,
      "6-12 months ago": 10,
      "1-2 years ago": 0,
      "2-3 years ago": -10,
      "3+ years ago": -15,
      "Never received a raise": -20,
    };
    baseScore += raiseBoosts[answers.lastRaise] || 0;

    const negBoosts: { [key: string]: number } = {
      "Yes, successfully": 15,
      "Yes, but accepted first offer anyway": 5,
      "No, accepted first offer": -10,
      "No, was told no negotiation allowed": -5,
    };
    baseScore += negBoosts[answers.negotiated] || 0;

    const askBoosts: { [key: string]: number } = {
      "Every review cycle": 10,
      "Once a year": 5,
      "Every few years": -5,
      "Only when changing jobs": -10,
      "Never initiated": -15,
    };
    baseScore += askBoosts[answers.askFrequency] || 0;

    const awareBoosts: { [key: string]: number } = {
      "Very confident - I research regularly": 10,
      "Somewhat confident": 5,
      "Not very confident": -5,
      "No idea": -10,
    };
    baseScore += awareBoosts[answers.marketAwareness] || 0;

    return Math.min(Math.max(baseScore, 20), 95);
  };

  const handleAnswer = (value: string): void => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage("email");
    }
  };

  const handleEmailSubmit = (): void => {
    if (email && email.includes("@")) {
      const calculatedScore = calculateScore(answers);
      setScore(calculatedScore);
      setStage("results");
    }
  };

  const getBelowMarket = (score: number): number => {
    if (score >= 80) return 5;
    if (score >= 70) return 12;
    if (score >= 60) return 23;
    if (score >= 50) return 35;
    return 45;
  };

  const getMoneyLeft = (score: number): number => {
    if (score >= 80) return 8;
    if (score >= 70) return 15;
    if (score >= 60) return 28;
    if (score >= 50) return 42;
    return 65;
  };

  if (stage === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto pt-12 pb-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-bold text-2xl mb-6">
              COMPanion
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              What&apos;s Your Pay Power Score?
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Discover if you&apos;re leaving money on the table
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take our 2-minute assessment to get your personalized Pay Power
              Score and find out exactly how much you could be earning.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Market Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  Compare your pay to industry standards
                </p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Negotiation Score
                </h3>
                <p className="text-sm text-gray-600">
                  Assess your advocacy effectiveness
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Action Plan
                </h3>
                <p className="text-sm text-gray-600">
                  Get personalized next steps
                </p>
              </div>
            </div>

            <button
              onClick={() => setStage("quiz")}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              Get My Free Score Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              ✓ Free forever · ✓ Takes 2 minutes · ✓ Join 10,000+ professionals
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "quiz") {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const q = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto pt-12">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-600 hover:bg-indigo-50 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="mt-4 text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    );
  }

  if (stage === "email") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Almost There!
            </h2>
            <p className="text-gray-600">
              Enter your email to receive your Pay Power Score
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
              placeholder="your.email@company.com"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none"
            />
            <button
              onClick={handleEmailSubmit}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Show My Score
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  if (stage === "results" && score !== null) {
    const belowMarket = getBelowMarket(score);
    const moneyLeft = getMoneyLeft(score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto pt-12 pb-20">
          <div className="text-center mb-8">
            <div className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-bold text-xl mb-4">
              COMPanion
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4">Your Pay Power Score</p>
              <div className="relative inline-block">
                <div className="text-7xl font-bold text-indigo-600 mb-2">
                  {score}
                </div>
                <div className="text-2xl text-gray-400">/100</div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">
                    You&apos;re {belowMarket}% Below Market
                  </h3>
                  <p className="text-gray-700 text-lg">
                    You&apos;re leaving approximately{" "}
                    <span className="font-bold text-red-600">
                      ${moneyLeft}K per year
                    </span>{" "}
                    on the table
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Market Position Analysis
                  </h4>
                  <p className="text-gray-600 text-sm">
                    See how your compensation compares to peers in your role and
                    location
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Negotiation Effectiveness Score
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Discover your advocacy gaps and where you&apos;re losing
                    leverage
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Personalized Action Plan
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Step-by-step roadmap to close your pay gap in the next 90
                    days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Salary Negotiation Scripts
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Word-for-word templates for your next conversation with your
                    manager
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setStage("fullReport")}
                className="bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Unlock Full Report - $39
              </button>
              <button
                onClick={() =>
                  alert(
                    "Stripe payment integration coming soon! This will process payment and unlock the full report."
                  )
                }
                className="bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Book Strategy Session - $197
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 mb-3">
              Share your score with colleagues:
            </p>
            <button
              onClick={() =>
                alert(
                  "Share functionality coming soon! This will let users share their score on social media."
                )
              }
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg transition"
            >
              <Share2 className="w-5 h-5" />
              Share My Score
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "fullReport" && score !== null) {
    const belowMarket = getBelowMarket(score);
    const moneyLeft = getMoneyLeft(score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto pt-12 pb-20">
          <div className="text-center mb-8">
            <div className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-bold text-xl mb-4">
              COMPanion
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Complete Pay Power Report
            </h1>
            <p className="text-gray-600">Sent to {email}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="text-center mb-8 pb-8 border-b">
              <p className="text-gray-600 mb-2">Your Pay Power Score</p>
              <div className="text-6xl font-bold text-indigo-600">
                {score}/100
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  Market Position Analysis
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Your Current Range
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {answers.currentPay || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Market Average
                      </p>
                      <p className="text-lg font-semibold text-green-600">
                        ~{belowMarket + 20}% higher
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Based on your role as a {answers.role || "professional"}{" "}
                    with {answers.experience || "your experience"} in{" "}
                    {answers.location || "your location"}, you&apos;re currently
                    earning below the 60th percentile for your position. Top
                    performers in your category typically earn ${moneyLeft}K-$
                    {moneyLeft + 15}K more annually.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-indigo-600" />
                  Negotiation Effectiveness
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Your Negotiation Score
                      </span>
                      <span className="text-sm font-semibold text-indigo-600">
                        {Math.round(score * 0.6)}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-indigo-600 h-3 rounded-full"
                        style={{ width: `${score * 0.6}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Our analysis shows you{" "}
                    {answers.negotiated === "Yes, successfully"
                      ? "have some negotiation experience"
                      : "may be leaving money on the table by not negotiating"}
                    . Last raise: {answers.lastRaise || "N/A"}. Discussion
                    frequency: {answers.askFrequency || "N/A"}.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">
                      💡 Key Insight:
                    </p>
                    <p className="text-gray-700 text-sm">
                      Professionals who negotiate every offer earn an average of
                      $1.5M more over their career. Even a single successful
                      negotiation can compound to $250K+ in lifetime earnings.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-indigo-600" />
                  Your 90-Day Action Plan
                </h3>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex gap-4">
                    <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Document Your Impact (Week 1-2)
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Create a comprehensive list of your achievements,
                        quantified results, and expanded responsibilities since
                        your last review.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Research Market Rates (Week 3-4)
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Gather 3-5 job postings for similar roles, talk to
                        recruiters, and use salary tools to establish your
                        target number.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Schedule The Conversation (Week 5-6)
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Request a dedicated meeting with your manager
                        specifically to discuss compensation and career growth.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Execute Your Ask (Week 7-8)
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Present your case with confidence using our proven
                        negotiation framework and scripts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-3">
                  Ready to Close Your Pay Gap?
                </h3>
                <p className="mb-6 text-indigo-100">
                  Book a 1-on-1 strategy session to create your personalized
                  negotiation plan and practice your pitch.
                </p>
                <button
                  onClick={() =>
                    alert(
                      "Calendly integration coming soon! This will open your booking calendar."
                    )
                  }
                  className="bg-white text-indigo-600 py-4 px-8 rounded-xl font-semibold hover:bg-gray-100 transition inline-block"
                >
                  Book Your Strategy Session - $197
                </button>
                <p className="mt-4 text-sm text-indigo-200">
                  Average client increases their salary by $15K-$45K after one
                  session
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setStage("landing");
                setCurrentQuestion(0);
                setAnswers({});
                setEmail("");
                setScore(null);
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
