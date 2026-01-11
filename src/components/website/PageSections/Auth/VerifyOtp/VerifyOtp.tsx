"use client";

import { useState } from "react";
import useAuth from "@/lib/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const router = useRouter();

  const { handleVerifyOtp, loading } = useAuth();

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    const res = await handleVerifyOtp(otpCode);

    if (res?.success) {
      toast.success("OTP verified successfully!");

      setTimeout(() => {
        router.push(`/reset-password`);
      }, 1000);
    } else {
      toast.error(res?.message || "Failed to verify OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF3EC] px-4">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="bg-white w-full max-w-xl rounded-2xl shadow-md p-10"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-semibold text-[#00C8B3] mb-2 text-center"
        >
          Verify Your Account
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[#6C757D] mb-6 text-center"
        >
          Enter the 6-digit code sent to your email to continue.
        </motion.p>

        {/* OTP Inputs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="flex items-center gap-3 justify-center mb-4"
        >
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              className={`w-14 h-14 text-2xl text-center border rounded-lg outline-none transition
                ${
                  digit
                    ? "border-[#00C8B3] text-[#00C8B3]"
                    : "border-gray-300 text-gray-700"
                }`}
            />
          ))}
        </motion.div>

        {/* Verify Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full bg-gradient-to-r from-[#005DAA] to-[#00C8B3] text-white py-3 rounded-md text-lg font-medium transition
            ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-gradient-to-r from-[#005DAA] to-[#00C8B3] cursor-pointer"
            }`}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </motion.button>
      </motion.div>
    </div>
  );
}
