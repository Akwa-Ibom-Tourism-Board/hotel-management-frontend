/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../axiosInstance";

export const registerEstablishments = async (formData: Record<string, any>) => {
  const response = await axiosInstance.post(
    "/establishments/register",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const verifyEstablishmentOtp = async (formData: {
  businessPhoneNumber: string;
  otp: string;
}) => {
  const response = await axiosInstance.post(
    "/establishments/verify-registration-otp",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const sendEstablishmentOtp = async (formData: {
  businessPhoneNumber: string;
}) => {
  const response = await axiosInstance.post(
    "/establishments/send-registration-otp",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
