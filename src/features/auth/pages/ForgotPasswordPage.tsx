import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MailCheck } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { Input, Button, FormField, toast } from "@/shared/ui";
import { forgotPassword } from "../api";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await forgotPassword(values);
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong, please try again.");
    }
  };

  if (sent) {
    return (
      <AuthLayout title="Check your email">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <MailCheck size={48} color="#0B4923" />
        </div>
        <p style={{ textAlign: "center" }}>
          If an account exists for that email, a password reset link is on its way.
        </p>
        <Link to="/login">
          <Button style={{ width: "100%" }}>Back to Log In</Button>
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we will send you a link to reset it."
      footer={<Link to="/login">Back to log in</Link>}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Email Address" required error={errors.email?.message}>
          <Input type="email" placeholder="you@example.com" {...register("email")} />
        </FormField>
        <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </AuthLayout>
  );
};
