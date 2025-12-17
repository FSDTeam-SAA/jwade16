"use client";
import { useQuestionnaireStore } from "@/store/useQuestionnaireStore";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  DollarSign,
  CheckCircle,
  FileText,
  MessageSquare,
  Calendar,
  Shield,
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  Download,
  Loader2,
} from "lucide-react";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import Link from "next/link";

export default function FullReport() {
  const { email, payPowerScore, marketGapDetected, answers } =
    useQuestionnaireStore();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Use store data or fallback to mock data
  const score = payPowerScore ?? 72;
  const role = answers.currentRole || "Senior Software Engineer";
  const location = answers.location || "San Francisco, CA";
  const experience = answers.experience || "5-7 years";
  const currentPay = answers.currentPay || "$150k-$200k";

  // Mock data for the report (will be replaced with API data later)
  const mockReportData = {
    marketAnalysis: {
      yourSalary: 175000,
      marketMedian: 215000,
      marketTop: 280000,
      percentile: 35,
      gap: 40000,
      gapPercentage: 23,
    },
    compensationBreakdown: [
      { category: "Base Salary", yours: 175000, market: 200000 },
      { category: "Annual Bonus", yours: 15000, market: 25000 },
      { category: "Stock/Equity", yours: 20000, market: 45000 },
      { category: "Benefits Value", yours: 12000, market: 15000 },
    ],
    actionPlan: [
      {
        week: "Week 1-2",
        title: "Research & Documentation",
        tasks: [
          "Document all your achievements and contributions",
          "Research competitor salaries using Levels.fyi and Glassdoor",
          "Identify your unique value propositions",
        ],
      },
      {
        week: "Week 3-4",
        title: "Build Your Case",
        tasks: [
          "Quantify your impact with metrics and numbers",
          "Prepare a one-page summary of your contributions",
          "Identify the right timing for the conversation",
        ],
      },
      {
        week: "Week 5-8",
        title: "Negotiate & Close",
        tasks: [
          "Schedule a dedicated meeting with your manager",
          "Present your case confidently using our scripts",
          "Be prepared to discuss alternatives if needed",
        ],
      },
    ],
    scripts: [
      {
        title: "Opening the Conversation",
        script:
          "I&apos;d like to discuss my compensation. I&apos;ve been reflecting on my contributions and the market rates for my role, and I believe there&apos;s an opportunity to align my pay with the value I bring.",
      },
      {
        title: "Presenting Your Value",
        script:
          "Over the past year, I&apos;ve [specific achievement]. This resulted in [quantifiable impact]. Based on my research, similar roles in our market are compensated at [range].",
      },
      {
        title: "Handling Pushback",
        script:
          "I understand budget constraints are real. Could we discuss a timeline for getting to market rate, or explore other forms of compensation like equity, bonuses, or additional benefits?",
      },
    ],
    leveragePoints: [
      "Strong performance reviews in the last 2 cycles",
      "Critical knowledge of legacy systems",
      "Leadership of high-visibility project",
      "In-demand skill set (React, Node.js, AWS)",
    ],
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005DAA0D] to-[#00C8B30D] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={reportRef}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <Link href="/">
              <span className="inline-block bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white px-6 py-2.5 rounded-full font-bold text-xl shadow-md mb-6 cursor-pointer">
                COMPanion
              </span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Your Complete Pay Power Report (Demo Report)
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Briefcase, label: "Role", value: role },
              { icon: MapPin, label: "Location", value: location },
              { icon: Clock, label: "Experience", value: experience },
              { icon: DollarSign, label: "Current Pay", value: currentPay },
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

          {/* Pay Power Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 relative overflow-hidden"
          >
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
                  Your Pay Power Score
                </h2>
                <p className="text-gray-600 mb-4">
                  {marketGapDetected ||
                    `You're in the ${mockReportData.marketAnalysis.percentile}th percentile for your role and location.`}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />$
                    {(mockReportData.marketAnalysis.gap / 1000).toFixed(0)}k
                    below market
                  </span>
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
                    <Target className="w-4 h-4" />
                    High negotiation potential
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Market Analysis Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-[#005DAA]" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Market Analysis
              </h2>
            </div>

            {/* Salary Comparison Visual */}
            <div className="mb-8">
              <div className="relative pt-8 pb-4">
                {/* Scale */}
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
                    style={{ width: "100%" }}
                  />
                </div>

                {/* Markers */}
                <div className="relative mt-4">
                  {/* Your Position */}
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      left: `${(mockReportData.marketAnalysis.yourSalary / mockReportData.marketAnalysis.marketTop) * 100}%`,
                    }}
                  >
                    <div className="w-4 h-4 bg-[#005DAA] rounded-full border-2 border-white shadow-lg mx-auto" />
                    <div className="mt-2 text-center">
                      <p className="text-xs text-gray-500">You</p>
                      <p className="font-bold text-[#005DAA]">
                        $
                        {(
                          mockReportData.marketAnalysis.yourSalary / 1000
                        ).toFixed(0)}
                        k
                      </p>
                    </div>
                  </div>

                  {/* Market Median */}
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      left: `${(mockReportData.marketAnalysis.marketMedian / mockReportData.marketAnalysis.marketTop) * 100}%`,
                    }}
                  >
                    <div className="w-4 h-4 bg-[#00C8B3] rounded-full border-2 border-white shadow-lg mx-auto" />
                    <div className="mt-2 text-center">
                      <p className="text-xs text-gray-500">Market Median</p>
                      <p className="font-bold text-[#00C8B3]">
                        $
                        {(
                          mockReportData.marketAnalysis.marketMedian / 1000
                        ).toFixed(0)}
                        k
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compensation Breakdown Table */}
            <h3 className="font-semibold text-gray-800 mb-4">
              Compensation Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                      Component
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">
                      Your Comp
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">
                      Market Rate
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-500">
                      Gap
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockReportData.compensationBreakdown.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-3 font-medium text-gray-800">
                        {row.category}
                      </td>
                      <td className="py-3 text-right text-gray-600">
                        ${(row.yours / 1000).toFixed(0)}k
                      </td>
                      <td className="py-3 text-right text-[#00C8B3] font-medium">
                        ${(row.market / 1000).toFixed(0)}k
                      </td>
                      <td className="py-3 text-right text-red-500 font-medium">
                        -${((row.market - row.yours) / 1000).toFixed(0)}k
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Leverage Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-teal-50 rounded-xl">
                <Shield className="w-6 h-6 text-[#00C8B3]" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Your Negotiation Leverage Points
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {mockReportData.leveragePoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-[#00C8B3] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 90-Day Action Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Your 90-Day Action Plan
              </h2>
            </div>

            <div className="space-y-6">
              {mockReportData.actionPlan.map((phase, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 border-l-2 border-gray-200"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-[#005DAA] to-[#00C8B3]" />
                  <div className="mb-2">
                    <span className="text-sm font-medium text-[#005DAA]">
                      {phase.week}
                    </span>
                    <h3 className="font-bold text-gray-800">{phase.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIdx) => (
                      <li
                        key={taskIdx}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Negotiation Scripts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Negotiation Scripts & Templates
              </h2>
            </div>

            <div className="space-y-4">
              {mockReportData.scripts.map((script, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                >
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#005DAA]" />
                    {script.title}
                  </h3>
                  <p className="text-gray-600 italic leading-relaxed">
                    &ldquo;{script.script}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
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
        </motion.div>
      </div>
    </div>
  );
}
