"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useQuestionnaireStore } from "@/store/useQuestionnaireStore";
import {
  CheckCircle,
  Star,
  Loader2,
  BarChart2,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useFreeFullReport } from "@/lib/hooks/useFullReport";

interface FreeReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FreeReportModal({
  open,
  onOpenChange,
}: FreeReportModalProps) {
  const { payPowerScore } = useQuestionnaireStore();
  const { data, isLoading, isError } = useFreeFullReport(payPowerScore ?? 0);

  const reportData = data?.data;
  const score = reportData?.score ?? payPowerScore ?? 0;

  let marketPositionValue = "Action Required";
  if (score > 70) marketPositionValue = "Strong";
  else if (score > 40) marketPositionValue = "Moderate";

  const headline =
    reportData?.headline || `Pay Power Potential: ${marketPositionValue}`;
  const supportingLine =
    reportData?.supportingLine || `Your Pay Power Score™ is ${score}.`;
  const staticDescription = reportData?.staticDescription;
  const aiDescription = reportData?.description;

  // Split AI description into paragraphs for clean rendering
  const aiParagraphs = aiDescription
    ? aiDescription.split(/\n+/).filter((p: string) => p.trim())
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 border-none shadow-2xl bg-white rounded-3xl max-h-[90vh] overflow-y-auto">
        <div className="absolute inset-0 bg-linear-to-br from-[#005DAA]/5 to-[#00C8B3]/5 pointer-events-none rounded-3xl" />

        <div className="relative z-10">
          {/* ── SECTION 1: Header gradient band ── */}
          <div className="bg-linear-to-r from-[#005DAA] to-[#00C8B3] p-8 text-white relative overflow-hidden rounded-t-3xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Star className="w-32 h-32" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold mb-1 text-white">
                Your Free PayPower Report
              </DialogTitle>
              <DialogDescription className="text-white/80 text-base">
                Preliminary analysis of your market position
              </DialogDescription>
            </DialogHeader>

            {/* Score ring + headline row */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
              {/* Circular score */}
              <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: score / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-white">
                    {score}
                  </span>
                  <span className="text-white/70 text-xs font-medium">
                    / 100
                  </span>
                </div>
              </div>

              {/* Headline + supporting line */}
              <div>
                <h3 className="text-2xl font-extrabold text-white leading-tight mb-1">
                  {headline}
                </h3>
                <p className="text-white/80 text-sm font-medium">
                  {supportingLine}
                </p>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: Platform Insight (staticDescription) ── */}
          {(isLoading || staticDescription) && (
            <div className="px-8 pt-7">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-blue-100">
                  <BarChart2 className="w-4 h-4 text-[#005DAA]" />
                </div>
                <h4 className="font-bold text-gray-900 text-base">
                  📊 Your PayPower Summary
                </h4>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Loading summary...</span>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {staticDescription}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── SECTION 3: AI-Generated Insight (description) ── */}
          <div className="px-8 pt-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-purple-100">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-base">
                🤖 AI-Generated Career Insight
              </h4>
            </div>

            <div className="border border-purple-200 rounded-2xl overflow-hidden">
              {/* AI badge banner */}
              <div className="flex items-center gap-2 bg-purple-50 border-b border-purple-200 px-5 py-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <p className="text-xs text-purple-600 font-medium">
                  The following insight is automatically generated using AI
                  based on your answers and career inputs.
                </p>
              </div>

              <div className="p-5 space-y-3">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Generating AI insight...</span>
                  </div>
                ) : isError ? (
                  <p className="text-sm text-red-500">
                    Failed to load AI insight.
                  </p>
                ) : aiParagraphs.length > 0 ? (
                  aiParagraphs.map((para: string, idx: number) => (
                    <p
                      key={idx}
                      className="text-gray-700 leading-relaxed text-sm"
                    >
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No AI insight available.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── SECTION 4: Recommended Actions ── */}
          <div className="px-8 pt-6 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-emerald-100">
                <Zap className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-base">
                ✅ Recommended Actions
              </h4>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              {isLoading ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading recommendations...</span>
                </div>
              ) : isError ? (
                <p className="text-sm text-red-500">
                  Failed to load recommendations.
                </p>
              ) : (
                <ul className="space-y-3">
                  {reportData?.recommendedActions?.map((action: string) => (
                    <li
                      key={action}
                      className="flex gap-3 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          {reportData?.disclaimer && (
            <p className="px-8 pb-4 text-[13px] text-gray-400 italic leading-relaxed">
              {reportData.disclaimer}
            </p>
          )}

          {/* Footer */}
          <div className="px-8 pb-6 pt-2">
            <button
              onClick={() => onOpenChange(false)}
              className="w-full py-3.5 bg-linear-to-r from-[#005DAA] to-[#00C8B3] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
