/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { registerEstablishments, verifyEstablishmentOtp, sendEstablishmentOtp } from "./api";

export function useRegisterEstablishments() {
  return useMutation({
    mutationFn: registerEstablishments,
    onSuccess: async () => {},
    onError: (error: any) => {
      console.error("Error Registering Establishment:", error);
    },
  });
}

export function useVerifyBusinessPhoneNumber() {
  return useMutation({
    mutationFn: verifyEstablishmentOtp,
    onSuccess: async () => {},
    onError: (error: any) => {
      console.error("Error verifying phone number:", error);
    },
  });
}

export function useSendVerificationOtp() {
  return useMutation({
    mutationFn: sendEstablishmentOtp,
    onSuccess: async () => {},
    onError: (error: any) => {
      console.error("Error sending OTP:", error);
    },
  });
}
