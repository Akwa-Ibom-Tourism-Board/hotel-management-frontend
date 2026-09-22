export type UserRole = "owner" | "admin";

export interface User {
  id: string;
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phoneNumber?: string | null;
  nin?: string | null;
  dateOfBirth?: string | null;
  role: UserRole;
  emailVerified: boolean;
}

export interface NinLookupPayload {
  nin: string;
}

export interface NinLookupResult {
  nin: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  photo?: string;
}

export interface RegisterPayload {
  nin: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
}

export interface VerifyEmailOtpPayload {
  email: string;
  otp: string;
}

export interface ResendEmailOtpPayload {
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RequestLoginOtpPayload {
  email: string;
}

export interface VerifyLoginOtpPayload {
  email: string;
  otp: string;
}

export interface AuthSessionResponse {
  token: string;
  user: User;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}
