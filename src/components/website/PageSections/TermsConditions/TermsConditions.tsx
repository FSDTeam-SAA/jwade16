"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, Clock, ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function TermsConditions() {
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
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-[#005DAA]/10 text-[#005DAA]">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Terms & Conditions
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
              <Clock className="w-4 h-4 text-[#00C8B3]" />
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
            <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
              <p className="text-lg leading-relaxed text-gray-700">
                Welcome to{" "}
                <span className="font-semibold text-[#005DAA]">
                  COMPanion Pay LLC
                </span>{" "}
                (“COMPanion,” “we,” “us,” or “our”). By accessing this website,
                purchasing services, or booking a consulting session, you agree
                to be bound by these Terms & Conditions (“Terms”). If you do not
                agree, please do not use this website or services.
              </p>

              {/* Section 1 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    1
                  </span>
                  Services Provided
                </h2>
                <div className="pl-10 space-y-3">
                  <p>
                    COMPanion provides compensation education, coaching, and
                    advisory services for individuals. Services may include
                    compensation analysis, offer reviews, negotiation guidance,
                    and career-related compensation insights.
                  </p>
                  <p className="italic bg-amber-50 border-l-4 border-amber-400 p-3 text-amber-900">
                    All services are educational and advisory in nature and are
                    not a substitute for legal, tax, financial, or employment
                    advice.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    2
                  </span>
                  No Guarantees
                </h2>
                <div className="pl-10">
                  <p className="mb-4">
                    COMPanion does not guarantee any specific outcomes,
                    including but not limited to:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Salary increases",
                      "Bonuses or equity awards",
                      "Job offers",
                      "Promotions",
                      "Successful negotiations",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#00C8B3] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4">
                    Compensation outcomes depend on many factors outside our
                    control, including employer policies, market conditions, and
                    individual performance.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    3
                  </span>
                  Client Responsibility
                </h2>
                <div className="pl-10">
                  <p className="mb-4">You acknowledge and agree that:</p>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>
                        You are solely responsible for decisions you make based
                        on the information provided.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>
                        You assume full responsibility for actions taken or not
                        taken.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>
                        COMPanion Pay LLC is not acting as your employer,
                        attorney, accountant, or fiduciary.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    4
                  </span>
                  Payments & Fees
                </h2>
                <div className="pl-10 space-y-3">
                  <p>
                    All fees are clearly disclosed prior to purchase. By
                    purchasing or booking:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>You agree to pay all applicable fees</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>
                        Fees are charged at the time of booking unless otherwise
                        stated
                      </span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>
                        Prices are subject to change at our discretion
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    5
                  </span>
                  Refunds, Cancellations & No-Shows
                </h2>
                <div className="pl-10 space-y-3">
                  <p>
                    Due to the nature of advisory services and time reserved:
                  </p>

                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                    <span>All consulting sessions are non-refundable</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                    <span>Missed or no-show appointments are forfeited</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                    <span>Rescheduling requires at least 24 hours’ notice</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                    <span>
                      Late cancellations may result in forfeiture of the session
                    </span>
                  </li>

                  <p className="mt-4 text-gray-900 text-[16px] font-bold">
                    Digital products, reports, and downloads are non-refundable
                    once delivered{" "}
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    6
                  </span>
                  Intellectual Property
                </h2>
                <div className="pl-10 space-y-3">
                  <p>
                    All materials, reports, frameworks, and content provided by
                    COMPanion Pay LLC are the intellectual property of COMPanion
                    Pay LLC.
                  </p>

                  <p>You may not: </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>Reproduce</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>Distribute</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>Sell</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>Share for commercial use</span>
                    </li>
                  </ul>
                  <p className="mt-1 text-gray-900 text-[16px] font-bold">
                    Without written permission.
                  </p>
                </div>
              </div>

              {/* Section 7 & 8 */}

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    7
                  </span>
                  Liability
                </h2>
                <div className="pl-4 border-l-2 border-gray-100">
                  <p className="">
                    To the fullest extent permitted by law, COMPanion Pay LLC
                    shall not be liable for any indirect, incidental,
                    consequential, or special damages arising out of or related
                    to your use of the services.
                  </p>
                  <p className="mt-2 ">
                    Our total liability shall not exceed the amount paid by you
                    for the specific service giving rise to the claim.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    8
                  </span>
                  Indemnity
                </h2>
                <div className="pl-10 space-y-3">
                  <p className="">
                    You agree to indemnify and hold harmless COMPanion Pay LLC
                    from any claims, damages, or expenses arising from:
                  </p>
                  <ul className="space-y-2 text-gray-700 mt-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>Your use of the services</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>Your violation of these Terms</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8B3] shrink-0" />
                      <span>
                        Decisions you make based on the information provided
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 9 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    9
                  </span>
                  Governing Law
                </h2>
                <div className="pl-4 border-l-2 border-gray-100">
                  <p className="">
                    These Terms shall be governed by and construed in accordance
                    with the laws of the State of Georgia, without regard to its
                    conflict of law principles.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005DAA] text-white text-sm">
                    10
                  </span>
                  Updates to these Terms
                </h2>
                <div className="pl-4 border-l-2 border-gray-100">
                  <p className="">
                    We may update these Terms at any time. Continued use of the
                    website or services constitutes acceptance of the updated
                    Terms.
                  </p>
                </div>
              </div>

              {/* Footer Info */}
              <div className="pt-8 border-t border-gray-100 text-center">
                <p className="font-semibold text-gray-900">COMPanion Pay LLC</p>

                <a
                  href="mailto:companionpayy@gmail.com"
                  className="text-[#005DAA] font-medium hover:underline"
                >
                  companionpayy@gmail.com
                </a>
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
