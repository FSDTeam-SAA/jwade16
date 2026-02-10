"use client";
import { useQuestionnaireStore } from "@/store/useQuestionnaireStore";
import { usePostCheckoutSession } from "@/lib/hooks/useCheckout";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Target,
  DollarSign,
  CheckCircle,
  Clock,
  Download,
  Loader2,
  Calendar as CalendarIcon,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import Link from "next/link";
import { useFullReport } from "@/lib/hooks/useFullReport";

export default function FullReport() {
  const { email, payPowerScore, answers, userSelectionId } =
    useQuestionnaireStore();
  const checkoutMutation = usePostCheckoutSession();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(true);
  const [countdown, setCountdown] = useState(3);

  // Cap the score at 100 for the API call to ensure we get the 80-100 range report
  const effectiveScore =
    (payPowerScore ?? 0) > 100 ? 100 : (payPowerScore ?? 0);
  const { data: apiResponse, isLoading } = useFullReport(effectiveScore);

  const fullReport = apiResponse?.data;

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowSuccess(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Use store data for user inputs
  const score = payPowerScore ?? 0;
  // const role = answers.currentRole || "N/A";
  const location = answers.location || "N/A";
  const experience = answers.experience || "N/A";
  const currentPay = answers.currentPay || "N/A";

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      setIsDownloading(true);

      // Use html-to-image with fixed settings to ensure a desktop-like layout for PDF
      const dataUrl = await toPng(reportRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        width: 1200,
        style: {
          padding: "40px",
          backgroundColor: "#ffffff",
          height: "auto",
        },
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 297;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const imgProps = (pdf as any).getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add extra pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("PayPower_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle session
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
      },
    );
  };

  if (isLoading && !showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#005DAA]" />
        <span className="ml-2 text-gray-600">Loading your report...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005DAA0D] to-[#00C8B30D] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", damping: 20 }}
              className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#005DAA] to-[#00C8B3]" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mb-6 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C8B3] to-[#00E5CC] rounded-full opacity-20 animate-pulse" />
                <div className="absolute inset-2 bg-gradient-to-r from-[#00C8B3] to-[#00E5CC] rounded-full flex items-center justify-center shadow-lg">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle
                      className="w-12 h-12 text-white"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-800 mb-3 text-center"
              >
                Payment Successful!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-center max-w-md mb-8"
              >
                Thank you for your Unlocked PayPower Score. We are preparing
                your full report.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-xs"
              >
                <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
                  <CalendarIcon className="w-5 h-5 text-[#005DAA]" />
                  <span className="text-sm font-medium">Loading Report...</span>
                </div>

                <div className="text-4xl font-bold bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-transparent bg-clip-text text-center mb-4">
                  {countdown}
                </div>

                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-[#005DAA] to-[#00C8B3]"
                  />
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div ref={reportRef}>
                {/* Header */}
                <motion.div className="text-center mb-10">
                  <Link href="/">
                    <span className="inline-block bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white px-6 py-2.5 rounded-full font-bold text-xl shadow-md mb-6 cursor-pointer">
                      COMPanion
                    </span>
                  </Link>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                    Your Complete Pay Power Report
                  </h1>
                  {email && (
                    <p className="text-gray-600">
                      Prepared for{" "}
                      <a
                        href={`mailto:${email}`}
                        className="font-semibold text-[#005DAA] underline decoration-[#005DAA66] underline-offset-4 hover:text-[#004b87] transition"
                      >
                        {email}
                      </a>
                    </p>
                  )}
                </motion.div>

                {/* Quick Stats Bar */}
                <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    // { icon: Briefcase, label: "Role", value: role },
                    { icon: MapPin, label: "Location", value: location },
                    { icon: Clock, label: "Experience", value: experience },
                    {
                      icon: DollarSign,
                      label: "Current Pay",
                      value: currentPay,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <p className="font-semibold text-gray-800 truncate">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </motion.div>

                {fullReport ? (
                  <>
                    {/* Pay Power Score Card */}
                    <motion.div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#005DAA] to-[#00C8B3]" />

                      <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Score Circle */}
                        <div className="relative">
                          <svg className="w-40 h-40 transform -rotate-90">
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              stroke="#f3f4f6"
                              strokeWidth="12"
                              fill="none"
                            />
                            <motion.circle
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: score / 100 }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              cx="80"
                              cy="80"
                              r="70"
                              stroke="url(#scoreGradient)"
                              strokeWidth="12"
                              fill="none"
                              strokeLinecap="round"
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
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-transparent bg-clip-text">
                              {score}
                            </span>
                            <span className="text-gray-400 text-sm">/ 100</span>
                          </div>
                        </div>

                        {/* Score Analysis */}
                        <div className="flex-1 text-center md:text-left">
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {fullReport.label || "Pay Power Score"}
                          </h2>
                          {fullReport.breakdown?.score_range && (
                            <p className="text-gray-600 mb-4 text-lg">
                              Score Range:{" "}
                              <span className="font-semibold text-[#005DAA]">
                                {fullReport.breakdown.score_range}
                              </span>
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <span className="inline-flex items-center gap-1 bg-blue-50 text-[#005DAA] px-3 py-1 rounded-full text-sm font-medium">
                              <Target className="w-4 h-4" />
                              {fullReport.subtitle || "Ready for action"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Uncomfortable Truth / What This Means */}
                    <motion.div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-50 rounded-xl">
                          <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                          What This Means
                        </h2>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
                        {fullReport.breakdown?.what_this_means ||
                          fullReport.description}
                      </p>
                    </motion.div>

                    {/* Typical Signs */}
                    <motion.div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-50 rounded-xl">
                          <TrendingUp className="w-6 h-6 text-[#005DAA]" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                          What This Usually Looks Like
                        </h2>
                      </div>
                      <ul className="space-y-4">
                        {(
                          fullReport.breakdown?.typical_signs ||
                          fullReport.whatThisUsuallyLooksLike
                        )?.map((item: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-[#00C8B3] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* What Most People Get Wrong / Common Mistake */}
                      <motion.div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 bg-amber-50 rounded-xl">
                            <Lightbulb className="w-6 h-6 text-amber-500" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-800">
                            Common Mistake
                          </h2>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                          {fullReport.breakdown?.common_mistake ||
                            fullReport.whatMostPeopleGetWrong}
                        </p>
                      </motion.div>

                      {/* The Real Risk / Long Term Consequence */}
                      <motion.div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 bg-orange-50 rounded-xl">
                            <AlertTriangle className="w-6 h-6 text-orange-500" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-800">
                            The Real Risk
                          </h2>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                          {fullReport.breakdown?.long_term_consequence ||
                            fullReport.realRisk}
                        </p>
                      </motion.div>
                    </div>

                    {/* What Moves The Score */}
                    <motion.div className="bg-gradient-to-br from-[#005DAA] to-[#0088cc] rounded-3xl shadow-xl p-8 mb-8 text-white">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white">
                          What Moves The Score
                        </h2>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {Array.isArray(
                          fullReport.breakdown?.what_moves_the_score,
                        ) ? (
                          fullReport.breakdown.what_moves_the_score.map(
                            (item: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex gap-3 text-white/90"
                              >
                                <CheckCircle className="w-5 h-5 text-[#00C8B3] shrink-0" />
                                <span className="text-lg">{item}</span>
                              </div>
                            ),
                          )
                        ) : (
                          <p className="text-white/90 leading-relaxed text-lg">
                            {fullReport.whatMovesTheScore}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Next Move / CTA */}
                    {(fullReport.nextMove ||
                      fullReport.breakdown?.strategic_next_step) && (
                      <motion.div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 bg-green-50 rounded-xl">
                            <ArrowRight className="w-6 h-6 text-green-600" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-800">
                            Your Next Move
                          </h2>
                        </div>
                        <div className="space-y-6">
                          {fullReport.nextMove?.timeframe && (
                            <div className="flex items-start gap-4">
                              <Clock className="w-5 h-5 text-gray-400 mt-1" />
                              <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                  Timeframe
                                </p>
                                <p className="text-gray-800 font-medium">
                                  {fullReport.nextMove.timeframe}
                                </p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-start gap-4">
                            <CheckCircle className="w-5 h-5 text-gray-400 mt-1" />
                            <div>
                              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                Action
                              </p>
                              <p className="text-gray-800 font-medium">
                                {fullReport.breakdown?.strategic_next_step ||
                                  fullReport.nextMove?.action}
                              </p>
                            </div>
                          </div>
                          {(fullReport.nextMove?.ctaButton ||
                            !fullReport.nextMove) && (
                            <div className="pt-4">
                              <button
                                onClick={handleSession}
                                className="bg-[#00C8B3] hover:bg-[#00b09e] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#00C8B3]/20 transition-all transform hover:-translate-y-1 cursor-pointer"
                              >
                                {fullReport.nextMove?.ctaButton ||
                                  "Book Strategy Session"}
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    {fullReport.disclaimer && (
                      <p className="mb-8 text-xs text-gray-400 italic text-center">
                        {fullReport.disclaimer}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-center py-20 text-gray-500">
                    <p>Unable to load report data.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading || !fullReport}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#005DAA] to-[#0088cc] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download PDF Report
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-4 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} COMPanion Pay. All rights reserved.
      </footer>
    </div>
  );
}
