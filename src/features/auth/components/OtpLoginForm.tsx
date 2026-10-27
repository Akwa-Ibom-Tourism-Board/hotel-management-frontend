import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, OtpInput, toast, FormField } from "@/shared/ui";
import { requestLoginOtp } from "../api";
import { useAuth } from "../context/AuthContext";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type EmailValues = z.infer<typeof emailSchema>;

const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "Enter the 6-digit code"),
});
type OtpValues = z.infer<typeof otpSchema>;

interface OtpLoginFormProps {
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export const OtpLoginForm = ({ onSubmittingChange }: OtpLoginFormProps) => {
  const { loginWithOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState<"request" | "verify">("request");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const requestForm = useForm<EmailValues>({ resolver: zodResolver(emailSchema) });
  const otpForm = useForm<OtpValues>({ resolver: zodResolver(otpSchema), defaultValues: { email: "", otp: "" } });

  const isSubmitting = requestForm.formState.isSubmitting || otpForm.formState.isSubmitting;

  useEffect(() => {
    onSubmittingChange(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  const handleRequest = async (values: EmailValues) => {
    try {
      await requestLoginOtp(values);
      setEmail(values.email);
      otpForm.setValue("email", values.email);
      setStage("verify");
      toast.success("A login code has been sent to your email");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send login code");
    }
  };

  const handleVerify = async (values: OtpValues) => {
    try {
      await loginWithOtp(values);
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from || "/dashboard", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid or expired code");
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await requestLoginOtp({ email });
      toast.success("A new login code has been sent to your email");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not resend login code");
    } finally {
      setIsResending(false);
    }
  };

  if (stage === "verify") {
    return (
      <>
        <p style={{ fontSize: "0.8125rem", marginTop: 0 }}>We sent a 6-digit code to {email}.</p>
        <form onSubmit={otpForm.handleSubmit(handleVerify)}>
          <FormField label="Login Code" required error={otpForm.formState.errors.otp?.message}>
            <Controller
              control={otpForm.control}
              name="otp"
              render={({ field }) => <OtpInput length={6} value={field.value} onChange={field.onChange} />}
            />
          </FormField>
          <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
            {otpForm.formState.isSubmitting ? "Verifying..." : "Log In"}
          </Button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.8125rem" }}>
          Did not get a code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={isSubmitting || isResending}
            style={{ background: "none", border: "none", color: "#FE6301", fontWeight: 600, cursor: "pointer", padding: 0 }}
          >
            {isResending ? "Sending..." : "Resend code"}
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "0.8125rem" }}>
          <button
            type="button"
            onClick={() => setStage("request")}
            disabled={isSubmitting || isResending}
            style={{ background: "none", border: "none", color: "#FE6301", fontWeight: 600, cursor: "pointer", padding: 0 }}
          >
            Use a different email
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <p style={{ fontSize: "0.8125rem", marginTop: 0 }}>We will email you a 6-digit code to log in.</p>
      <form onSubmit={requestForm.handleSubmit(handleRequest)}>
        <FormField label="Email Address" required error={requestForm.formState.errors.email?.message}>
          <Input type="email" placeholder="you@example.com" {...requestForm.register("email")} />
        </FormField>
        <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
          {requestForm.formState.isSubmitting ? "Sending..." : "Send Login Code"}
        </Button>
      </form>
    </>
  );
};
