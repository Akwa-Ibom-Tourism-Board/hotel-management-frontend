/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/components/HomeComponents/HomeButton";
import React, { useState } from "react";

const OTPVerification = ({
  phoneNumber,
  onVerified,
  onCancel,
}: {
  phoneNumber: string;
  onVerified: () => void;
  onCancel: () => void;
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);

    // Simulate API call
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/verify-otp', {
      //   method: 'POST',
      //   body: JSON.stringify({ phoneNumber, otp: otpValue })
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo, accept "123456" as valid OTP
      if (otpValue === "123456") {
        onVerified();
      } else {
        setError("Invalid OTP. Please try again.");
        setIsVerifying(false);
      }
    } catch (err: any) {
      setError("Verification failed. Please try again.");
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    // TODO: Replace with actual API call
    // await fetch('/api/send-otp', {
    //   method: 'POST',
    //   body: JSON.stringify({ phoneNumber })
    // });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsResending(false);
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Verify Phone Number
      </h3>
      <p className="text-gray-600 mb-6">
        Enter the 6-digit code sent to {phoneNumber}
      </p>

      <div className="flex justify-center gap-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-12 h-12 text-[#2a2523] text-center text-xl font-bold border-2 rounded-lg focus:outline-none 
    ${digit ? "border-[#e77818]" : "border-gray-300"} 
    focus:border-[#e77818]`}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex justify-center gap-4 mb-4">
        <Button
          onClick={onCancel}
          background="#78716e"
          disabled={isVerifying || isResending}
        >
          Change Number
        </Button>
        <Button
          onClick={handleVerify}
          disabled={isVerifying || isResending}
          background="#e77818"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      </div>

      <button
        onClick={handleResend}
        disabled={isResending || isVerifying}
        className="text-orange-600 hover:underline disabled:opacity-50"
      >
        {isResending ? "Resending..." : "Resend Code"}
      </button>

      <p className="text-xs text-gray-500 mt-4">
        Demo: Use OTP "123456" to verify
      </p>
    </div>
  );
};

export default OTPVerification;
