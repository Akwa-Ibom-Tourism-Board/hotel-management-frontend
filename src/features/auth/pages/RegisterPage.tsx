import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { AccountDetailsForm } from "../components/AccountDetailsForm";
import { registerAccount } from "../api";
import type { RegisterPayload } from "../api/types";
import { toast } from "@/shared/ui";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (payload: RegisterPayload) => {
    try {
      const { email } = await registerAccount(payload);
      navigate("/register/verify-email", { state: { email } });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "We could not save your details, please try again.",
      );
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Tell us a bit about you and set a password to get started."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <AccountDetailsForm onSubmit={handleSubmit} />
    </AuthLayout>
  );
};
