"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, ExternalLink } from "lucide-react";

export default function Success() {
  const [countdown, setCountdown] = useState(3);
  const calendlyUrl = "https://calendly.com/companionpayy/book-a-consultation";

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirect after 3 seconds
    const redirect = setTimeout(() => {
      window.location.href = calendlyUrl;
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

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
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#005DAA] to-[#00C8B3] rounded-t-3xl" />

        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00C8B3] to-[#00E5CC] rounded-full opacity-20 animate-pulse" />
          <div className="absolute inset-2 bg-gradient-to-r from-[#00C8B3] to-[#00E5CC] rounded-full flex items-center justify-center shadow-lg">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        {/* Success message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Thank you for your Unlocked PayPower Score. You&apos;re being
          redirected to schedule your consultation.
        </motion.p>

        {/* Countdown indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
            <Calendar className="w-5 h-5 text-[#005DAA]" />
            <span className="text-sm font-medium">
              Redirecting to Calendly in
            </span>
          </div>
          <motion.div
            key={countdown}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-transparent bg-clip-text"
          >
            {countdown}
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
            className="h-full bg-gradient-to-r from-[#005DAA] to-[#00C8B3]"
          />
        </motion.div>

        {/* Manual redirect link */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          href={calendlyUrl}
          className="inline-flex items-center gap-2 text-[#005DAA] hover:text-[#004a88] font-medium text-sm transition-colors"
        >
          <span>Click here if not redirected</span>
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </div>
  );
}
