"use client";

import { TrendingUp, Award, Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative lg:grid lg:h-screen lg:place-content-center bg-gradient-to-br from-[#005DAA]/10 to-[#00C8B3]/10 overflow-hidden">
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

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-xl sm:text-2xl shadow-md tracking-wide mb-6">
            COMPanion
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            What&apos;s Your Pay Power Score?
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4">
            Discover if you&apos;re leaving money on the table
          </p>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
            Take our 2-minute assessment to get your personalized Pay Power
            Score and find out exactly how much you could be earning.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-10 mb-10 backdrop-blur-lg border border-white/40"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 md:mb-10">
            {/* Card 1 */}
            <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-[#005DAA]/10 to-[#00C8B3]/10 rounded-2xl shadow-sm hover:shadow-md transition">
              <TrendingUp className="w-12 h-12 text-[#005DAA] mx-auto mb-4" />
              <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
                Market Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Compare your pay to industry standards
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-[#00C8B3]/10 to-[#005DAA]/10 rounded-2xl shadow-sm hover:shadow-md transition">
              <Award className="w-12 h-12 text-[#00C8B3] mx-auto mb-4" />
              <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
                Negotiation Score
              </h3>
              <p className="text-sm text-gray-600">
                Assess your advocacy effectiveness
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-[#005DAA]/10 to-[#00C8B3]/10 rounded-2xl shadow-sm hover:shadow-md transition">
              <Target className="w-12 h-12 text-[#005DAA] mx-auto mb-4" />
              <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
                Action Plan
              </h3>
              <p className="text-sm text-gray-600">
                Get personalized next steps
              </p>
            </div>
          </div>

          {/* Button */}
          <Link href="/question">
            <button className="w-full bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md cursor-pointer">
              Get My Free Score Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-gray-600">
          <p>
            ✓ Free forever · ✓ Takes 2 minutes · ✓ Join 10,000+ professionals
          </p>
        </div>

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

        <footer className="mt-4 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} COMPanion Pay. All rights reserved.
        </footer>
      </div>
    </section>
  );
}
