// src/lib/hooks/useAuth.ts

// src/lib/hooks/useAuth.ts
"use client";

import { useState } from "react";
import {
  forgotPassword,
  resendForgotOtp,
  resetPassword,
  verifyOtp,
} from "../services/authService";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    const res = await forgotPassword(email);

    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.message || "Something went wrong");
    }

    setLoading(false);
    return res;
  };

  // Handle OTP verification
  const handleVerifyOtp = async (otp: string) => {
    setLoading(true);
    setError(null);

    // Retrieve email and token from localStorage
    const email = localStorage.getItem("email");

    if (!email) {
      setError("Email not found in localStorage");
      setLoading(false);
      return { success: false, message: "Email not found. Please try again." };
    }

    const res = await verifyOtp({ email, otp });

    if (res.success) {
      if (res.data?.data?.resetToken) {
        localStorage.setItem("resetToken", res.data.data.resetToken);
      }
      setResult(res.data);
    } else {
      setError(res.message || "Something went wrong");
    }

    setLoading(false);
    return res;
  };

  //  NEW — Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setError(null);

    // Retrieve token from localStorage
    const tokenFromURL = localStorage.getItem("resetToken") || "";

    if (!tokenFromURL) {
      setError("Reset token not found");
      setLoading(false);
      return {
        success: false,
        message: "Reset token not found. Please try again.",
      };
    }

    const res = await resendForgotOtp(tokenFromURL);

    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.message || "Something went wrong");
    }

    setLoading(false);
    return res;
  };

  // Reset Password hook
  const handleResetPassword = async (newPassword: string) => {
    setLoading(true);
    setError(null);

    // Retrieve token from localStorage
    const tokenFromURL = localStorage.getItem("resetToken") || "";

    if (!tokenFromURL) {
      setError("Reset token not found");
      setLoading(false);
      return {
        success: false,
        message: "Reset token not found. Please try again.",
      };
    }

    const res = await resetPassword(newPassword, tokenFromURL);

    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.message || "Something went wrong");
    }

    setLoading(false);
    return res;
  };

  return {
    loading,
    result,
    error,
    handleVerifyOtp,
    handleForgotPassword,
    handleResendOtp,
    handleResetPassword,
  };
}
