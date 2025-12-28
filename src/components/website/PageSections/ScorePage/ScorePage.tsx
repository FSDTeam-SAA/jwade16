"use client";

import {
  TrendingUp,
  Lock,
  CheckCircle,
  ArrowRight,
  Shield,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useQuestionnaireStore } from "@/store/useQuestionnaireStore";
import { usePostCheckoutSession } from "@/lib/hooks/useCheckout";
import Link from "next/link";

function ScoreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamEmail = searchParams.get("email");
  const {
    email: storeEmail,
    setEmail,
    payPowerScore,
    marketGapDetected,
    answers,
    userSelectionId,
  } = useQuestionnaireStore();
  const checkoutMutation = usePostCheckoutSession();

  const email = searchParamEmail || storeEmail;

  useEffect(() => {
    // 1. If we have email in store but NOT in URL, update URL
    if (storeEmail && !searchParamEmail) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("email", storeEmail);
      router.replace(`?${newParams.toString()}`);
    }
    // 2. If we have email in URL but NOT in store (or mismatch), sync to store
    else if (searchParamEmail && searchParamEmail !== storeEmail) {
      setEmail(searchParamEmail);
    }
  }, [storeEmail, searchParamEmail, router, searchParams, setEmail]);

  // Use store data or fallback to 0/empty
  const score = payPowerScore ?? 0;

  // If undefined/null, default to 0
  let belowMarket = 0;
  if (marketGapDetected) {
    const match = marketGapDetected.match(/(\d+)%/);
    if (match && match[1]) {
      belowMarket = parseInt(match[1], 10);
    }
  }

  const handleFullReport = () => {
    checkoutMutation.mutate(
      {
        userId: userSelectionId,
        totalAmount: 39,
        paymentType: "fullReport",
      },
      {
        onSuccess: (data) => {
          if (data?.checkoutUrl) {
            window.location.href = data.checkoutUrl;
          }
        },
        onError: (error) => {
          toast.error("Failed to create checkout session");
          console.error("Checkout error:", error);
        },
      }
    );
  };

  const handleSession = () => {
    checkoutMutation.mutate(
      {
        userId: userSelectionId,
        totalAmount: 497,
        paymentType: "bookSeason",
      },
      {
        onSuccess: (data) => {
          if (data?.checkoutUrl) {
            window.location.href = data.checkoutUrl;
          }
        },
        onError: (error) => {
          toast.error("Failed to create checkout session");
          console.error("Checkout error:", error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005DAA]/10 to-[#00C8B3]/10 overflow-hidden p-4 relative">
      {/* Background circles */}
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

      <div className="relative max-w-4xl mx-auto pt-10 pb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/">
            <span className="inline-block bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white px-6 py-2.5 rounded-full font-bold text-xl shadow-md mb-6 cursor-pointer">
              COMPanion
            </span>
          </Link>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden"
        >
          {/* Decorative background gradient */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#005DAA] to-[#00C8B3]" />

          <div className="text-center mb-4 relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {/* Your Pay Power Score */}
              {email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 mt-4 font-medium"
                >
                  <span className="text-gray-800">Pay Power Score for:</span>

                  <a
                    href={`mailto:${email}`}
                    className="ml-2 font-semibold text-[#005DAA] underline decoration-[#005DAA]/40 underline-offset-4 hover:text-[#004b87] transition"
                  >
                    {email}
                  </a>
                </motion.p>
              )}
            </h2>

            <div className="relative inline-flex items-center justify-center">
              {/* Circular Progress */}
              <svg className="w-58 h-58 transform -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="#f3f4f6"
                  strokeWidth="16"
                  fill="none"
                />
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: score / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="url(#scoreGradient)"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  className="drop-shadow-lg"
                />
                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#005DAA" />
                    <stop offset="100%" stopColor="#00C8B3" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-5xl font-black bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-transparent bg-clip-text"
                >
                  {score}
                </motion.span>
                <span className="text-gray-400 font-medium text-lg">/ 100</span>
              </div>
            </div>
          </div>

          {/* Below Market Info */}
          {belowMarket > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-red-50/50 border border-red-100 rounded-2xl p-6 mb-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-24 h-24 text-red-600" />
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-red-100">
                  <TrendingUp className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">
                    Market Gap Detected: {belowMarket}% Below Market
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Based on your role and location, your contributions may not
                    be fully recognized{" "}
                    {/* <span className="font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                      ${moneyLeft}k per year
                    </span> */}
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 mb-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CheckCircle className="w-24 h-24 text-emerald-600" />
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">
                    Competitive Compensation Detected
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Great news! Your compensation appears to be{" "}
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      at or above market rates
                    </span>{" "}
                    for your role and location.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-4 mb-10"
          >
            {[
              {
                icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
                title: "Market Analysis",
                desc: "Detailed compensation comparison.",
                color: "bg-blue-50",
              },
              {
                icon: <Shield className="w-5 h-5 text-teal-500" />,
                title: "Negotiation Assessment",
                desc: "Identify your leverage points.",
                color: "bg-teal-50",
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-indigo-500" />,
                title: "Action Plan",
                desc: "90-day roadmap to fair pay.",
                color: "bg-indigo-50",
              },
              {
                icon: <FileText className="w-5 h-5 text-purple-500" />,
                title: "Scripts & Templates",
                desc: "Exact words to use.",
                color: "bg-purple-50",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all bg-gray-50/30"
              >
                <div className={`p-3 rounded-xl ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <button
              onClick={handleFullReport}
              className="relative group overflow-hidden bg-[#005DAA] text-white p-1 rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#005DAA] to-[#0088cc] opacity-100 group-hover:opacity-90 transition-opacity" />
              <div className="relative bg-white/10 backdrop-blur-sm h-full rounded-[10px] py-4 px-6 flex items-center justify-center gap-3 transition-colors group-hover:bg-transparent">
                <Lock className="w-5 h-5" />
                <span className="font-semibold">Unlock Full Report</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                  $39
                </span>
              </div>
            </button>

            <button
              onClick={handleSession}
              className="relative group overflow-hidden bg-white text-gray-800 p-1 rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-all border border-teal-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C8B3] to-[#00E5CC] opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative h-full rounded-[10px] py-4 px-6 flex items-center justify-center gap-3">
                <span className="font-semibold text-gray-700 group-hover:text-teal-700 transition-colors flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Book Strategy Session
                </span>
                <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded text-sm font-medium border border-teal-100">
                  $497
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transition-colors" />
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ScorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScoreContent />
    </Suspense>
  );
}
