"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useQuestionnaireStore } from "@/store/useQuestionnaireStore";
import { TrendingUp, CheckCircle, Shield, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface FreeReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FreeReportModal({
  open,
  onOpenChange,
}: FreeReportModalProps) {
  const { payPowerScore, marketGapDetected } = useQuestionnaireStore();

  const score = payPowerScore ?? 0;

  const marketPosition =
    score > 70 ? "Strong" : score > 40 ? "Moderate" : "Action Required";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
        <div className="absolute inset-0 bg-linear-to-br from-[#005DAA]/5 to-[#00C8B3]/5 pointer-events-none" />

        <div className="relative z-10">
          <div className="bg-linear-to-r from-[#005DAA] to-[#00C8B3] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Star className="w-32 h-32" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold mb-2 text-white">
                Your Free PayPower Summary
              </DialogTitle>
              <DialogDescription className="text-white/80 text-lg">
                Preliminary analysis of your market position
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="relative flex items-center justify-center w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: score / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="url(#modalScoreGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="modalScoreGradient"
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
                  <span className="text-3xl font-bold bg-linear-to-r from-[#005DAA] to-[#00C8B3] text-transparent bg-clip-text">
                    {score}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Market Position: {marketPosition}
                </h3>
                <p className="text-gray-600">
                  {marketGapDetected
                    ? `We've identified a potential ${marketGapDetected} gap in your current compensation compared to market standards.`
                    : "Your compensation is currently aligned with market averages, but there may still be room for optimization."}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm h-fit">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Leverage Check
                  </h4>
                  <p className="text-gray-600 text-xs">
                    Based on your role, you have significant leverage in
                    performance-based incentives.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 flex gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm h-fit">
                  <Shield className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Benefit Alignment
                  </h4>
                  <p className="text-gray-600 text-xs">
                    Your current benefits package is{" "}
                    {score > 60 ? "above" : "at"} the average for your industry.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Key Next Steps
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  Compare your base salary against the updated 2026 industry
                  benchmarks.
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  Review your equity vesting schedule for potential
                  re-negotiation points.
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  Document recent impact metrics to prepare for your next
                  compensation review.
                </li>
              </ul>
            </div>
          </div>

          <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              Want the full granular breakdown and exact scripts?
            </p>
            <button
              onClick={() => onOpenChange(false)}
              className="px-8 py-3 bg-linear-to-r from-[#005DAA] to-[#00C8B3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
            >
             Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
