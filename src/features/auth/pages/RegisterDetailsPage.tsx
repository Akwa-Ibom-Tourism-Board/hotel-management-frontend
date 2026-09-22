import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { AccountDetailsForm } from "../components/AccountDetailsForm";
import { registerAccount } from "../api";
import type { NinLookupResult, RegisterPayload } from "../api/types";
import { NIN_SESSION_KEY } from "./RegisterNinPage";
import { toast, Button } from "@/shared/ui";

const readNinResult = (state: unknown): NinLookupResult | null => {
  if (state && typeof state === "object" && "nin" in state) {
    return state as NinLookupResult;
  }
  try {
    const raw = sessionStorage.getItem(NIN_SESSION_KEY);
    return raw ? (JSON.parse(raw) as NinLookupResult) : null;
  } catch {
    return null;
  }
};

export const RegisterDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ninResult] = useState<NinLookupResult | null>(() =>
    readNinResult(location.state),
  );

  useEffect(() => {
    if (!ninResult) {
      navigate("/register", { replace: true });
    }
  }, [ninResult, navigate]);

  const handleSubmit = async (payload: RegisterPayload) => {
    try {
      const { email } = await registerAccount(payload);
      sessionStorage.removeItem(NIN_SESSION_KEY);
      navigate("/register/verify-email", { state: { email } });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "We could not save your details, please try again.",
      );
    }
  };

  if (!ninResult) {
    return (
      <AuthLayout title="Let's verify your NIN first">
        <p style={{ textAlign: "center" }}>
          Please start again from the NIN verification step.
        </p>
        <Button style={{ width: "100%" }} onClick={() => navigate("/register")}>
          Back to NIN Verification
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      eyebrow="Step 2 of 3"
      title="Create your account"
      subtitle="Confirm your details and set a password; your name and date of birth come from your verified NIN."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <AccountDetailsForm ninResult={ninResult} onSubmit={handleSubmit} />
    </AuthLayout>
  );
};
