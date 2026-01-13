"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ContributionFormModal from "../../ContributionFlow/ContributionFormModal";

export default function Contribution() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-8 sm:p-12 text-center">
          {/* Icon/Decoration */}
          <div className="mx-auto w-20 h-20 bg-linear-to-br from-[#005DAA]/10 to-[#00C8B3]/10 rounded-full flex items-center justify-center mb-8">
            <Heart className="w-10 h-10 text-[#005DAA]" />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Help Make Pay Fair for{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#005DAA] to-[#00C8B3]">
              Everyone
            </span>
          </h1>

          {/* Description */}
          <div className="space-y-6 mb-10 text-lg text-gray-600">
            <p className="font-medium text-gray-700">
              You’re about to see your Pay Power Score. Want to help others get
              accurate insights too?
            </p>

            <p>By sharing a few more details anonymously, you will:</p>

            <ul className="text-left max-w-md mx-auto space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#00C8B3] shrink-0 mt-0.5" />
                <span>Help millions of people understand their true worth</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#00C8B3] shrink-0 mt-0.5" />
                <span>
                  Join the movement to make compensation more transparent
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary CTA */}
            <Button
              size="lg"
              className="w-full sm:w-auto bg-linear-to-r from-[#005DAA] to-[#00C8B3] hover:opacity-90 text-white font-semibold py-6 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Yes, I’ll Help
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {/* Secondary CTA */}
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-gray-400 hover:text-gray-600 border font-medium py-6 px-8 rounded-xl text-lg hover:bg-gray-100 cursor-pointer"
              >
                Skip for Now
              </Button>
            </Link>
          </div>

          {/* Footer / Privacy Notice */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400 space-y-4">
            <h3 className="uppercase tracking-wider font-semibold text-gray-500 mb-2">
              Your Privacy Matters
            </h3>
            <ul className="space-y-1">
              <li>• Your data is 100% anonymous in our database.</li>
              <li>
                • Companies only see aggregated insights (e.g., “Average for
                Senior PMs”).
              </li>
              <li>
                • You may request data deletion at any time by contacting{" "}
                <a
                  href="mailto:companionpayy@gmail.com"
                  className="text-[#005DAA] hover:underline"
                >
                  companionpayy@gmail.com
                </a>
                .
              </li>
            </ul>
            <p className="pt-2 text-gray-400">
              By sharing your information, you agree to our{" "}
              <Link
                href="/terms-conditions"
                className="text-[#00C8B3] hover:underline"
              >
                [Data Contribution Terms]
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bottom decoration line */}
        <div className="h-2 bg-linear-to-r from-[#005DAA] to-[#00C8B3]" />
      </motion.div>

      <ContributionFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
