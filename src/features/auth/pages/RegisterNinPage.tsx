import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { NinLookupForm, type NinFormValues } from "../components/NinLookupForm";
import { NinResultModal } from "../components/NinResultModal";
import { lookupNin } from "../api";
import type { NinLookupResult } from "../api/types";
import { toast } from "@/shared/ui";

export const NIN_SESSION_KEY = "ak_hotels_nin_lookup";

export const RegisterNinPage = () => {
  const navigate = useNavigate();
  const [lastNin, setLastNin] = useState("");
  const [ninResult, setNinResult] = useState<NinLookupResult | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLookup = async (values: NinFormValues) => {
    setLastNin(values.nin);
    try {
      const result = await lookupNin(values);
      setNinResult(result);
      setModalOpen(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not verify that NIN, please try again.");
    }
  };

  const handleContinue = () => {
    if (!ninResult) return;
    sessionStorage.setItem(NIN_SESSION_KEY, JSON.stringify(ninResult));
    setModalOpen(false);
    navigate("/register/details", { state: ninResult });
  };

  const handleChangeNin = () => {
    setModalOpen(false);
    setNinResult(null);
  };

  return (
    <AuthLayout
      eyebrow="Step 1 of 3"
      title="Verify your identity"
      subtitle="Enter your National Identification Number to get started; we will confirm your details before you set up your account."
      footer={
        <>
          Already registered? <Link to="/login">Log in</Link>
        </>
      }
    >
      <NinLookupForm onSubmit={handleLookup} defaultNin={lastNin} />
      <NinResultModal open={modalOpen} result={ninResult} onContinue={handleContinue} onChangeNin={handleChangeNin} />
    </AuthLayout>
  );
};
