"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Clock,
  CheckCircle2,
  ArrowBigLeft,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#005DAA]/10 to-[#00C8B3]/10 py-12 sm:py-20 overflow-hidden">
      {/* Background decoration */}
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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-[#00C8B3]/10 text-[#00C8B3]">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
              <Clock className="w-4 h-4 text-[#005DAA]" />
              <span>Last Updated: January 15, 2026</span>
            </div>
          </div>

          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
               bg-gray-100 text-gray-700 font-medium
               hover:bg-[#005DAA]/10 hover:text-[#005DAA]
               transition-all duration-300 group"
            >
              <ArrowBigLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Content Section */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="prose prose-blue max-w-none text-gray-600 space-y-10">
              <p className="text-lg leading-relaxed text-gray-700">
                <span className="font-semibold text-[#005DAA]">
                  COMPanion Pay LLC
                </span>{" "}
                respects your privacy and is committed to protecting your
                personal information.
              </p>

              {/* Section 1 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-[#005DAA]" />
                  1. We may collect:
                </h2>
                <div className="pl-9">
                  <p className="mb-4">We may collect:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "1. Name",
                      },
                      {
                        title: "2. Email address",
                      },
                      {
                        title:
                          "3. Payment information (processed securely by third-party providers) ",
                      },
                      {
                        title:
                          "4. Compensation and employment details voluntarily provided",
                      },
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="bg-gray-50/50 p-4 rounded-xl border border-gray-100"
                      >
                        <p className="font-semibold text-gray-900 text-sm mb-1">
                          {item.title}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-[#005DAA]" />
                  2. How We Use Your Information
                </h2>
                <div className="pl-9 space-y-4">
                  <p>Your information is used to:</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Deliver services",
                      "Communicate with you",
                      "Process payments",
                      "Improve our offerings ",
                    ].map((text, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C8B3] mt-0.5 shrink-0" />
                        <span className="text-gray-700">{text}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-medium text-[#005DAA] bg-[#005DAA]/5 p-4 rounded-lg border-l-4 border-[#005DAA]">
                    Crucially: We do not sell or rent personal data.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#005DAA]" />
                  3. Third-Party Services
                </h2>
                <div className="pl-9">
                  <p className="mb-4">
                    We may use trusted third parties such as:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Payment processors (e.g. Stripe) ",
                      "Scheduling tools (e.g., Calendly)",
                      "Analytics and hosting providers ",
                    ].map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4">
                    These providers access information only as necessary to
                    perform services on our behalf.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-[#005DAA]" />
                  4. Data Security & Updates
                </h2>
                <div className="pl-9 space-y-4">
                  <p>
                    We take reasonable steps to protect your information but
                    cannot guarantee absolute security.
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    This Privacy Policy may be updated periodically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="mt-4 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} COMPanion Pay. All rights reserved.
      </footer>
    </section>
  );
}
