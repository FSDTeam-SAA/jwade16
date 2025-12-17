"use client";
import { motion } from "framer-motion";
import { XCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005DAA]/10 to-[#00C8B3]/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute w-56 h-56 md:w-72 md:h-72 bg-[#005DAA] rounded-full blur-3xl -top-10 -left-10" />
        <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-[#00C8B3] rounded-full blur-3xl bottom-0 right-0" />
      </div>

      {/* Main content card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", damping: 20 }}
        className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center border border-white/20"
      >
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-red-400 rounded-t-3xl" />

        {/* Animated X icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-400 rounded-full opacity-20 animate-pulse" />
          <div className="absolute inset-2 bg-gradient-to-r from-amber-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <XCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        {/* Cancel message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
        >
          Payment Cancelled
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          Your payment was not completed. No charges have been made to your
          account. You can try again or return to the homepage.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#005DAA] to-[#0088cc] text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all border border-gray-200"
          >
            <Home className="w-5 h-5" />
            Return to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
