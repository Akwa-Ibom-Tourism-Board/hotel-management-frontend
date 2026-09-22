import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../components/AuthLayout";
import { PasswordInput, Button, FormField, toast } from "@/shared/ui";
import { resetPassword } from "../api";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (!token) {
    return (
      <AuthLayout title="Link expired or invalid">
        <p style={{ textAlign: "center" }}>This password reset link is invalid or has expired.</p>
        <Link to="/forgot-password">
          <Button style={{ width: "100%" }}>Request a New Link</Button>
        </Link>
      </AuthLayout>
    );
  }

  const onSubmit = async (values: FormValues) => {
    try {
      await resetPassword({ token, password: values.password });
      toast.success("Your password has been reset, please log in.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not reset your password, please try again.");
    }
  };

  return (
    <AuthLayout title="Set a new password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="New Password" required error={errors.password?.message}>
          <PasswordInput placeholder="At least 8 characters" {...register("password")} />
        </FormField>
        <FormField label="Confirm Password" required error={errors.confirmPassword?.message}>
          <PasswordInput placeholder="Re-enter your password" {...register("confirmPassword")} />
        </FormField>
        <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Reset Password"}
        </Button>
      </form>
    </AuthLayout>
  );
};
