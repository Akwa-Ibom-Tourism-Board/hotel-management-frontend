import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, PasswordInput, Button, toast, FormField } from "@/shared/ui";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "@/shared/lib";

const ForgotPasswordRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

interface PasswordLoginFormProps {
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export const PasswordLoginForm = ({ onSubmittingChange }: PasswordLoginFormProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    onSubmittingChange(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values);
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from || "/dashboard", { replace: true });
    } catch (error) {
      if (error instanceof ApiError && error.status === 403) {
        toast.info("Please verify your email first, we have sent you a new code.");
        navigate("/register/verify-email", { state: { email: values.email } });
        return;
      }
      toast.error(error instanceof Error ? error.message : "Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Email Address" required error={errors.email?.message}>
        <Input type="email" placeholder="you@example.com" {...register("email")} />
      </FormField>
      <FormField label="Password" required error={errors.password?.message}>
        <PasswordInput placeholder="••••••••" {...register("password")} />
      </FormField>

      <ForgotPasswordRow>
        <ForgotPasswordLink to="/forgot-password">Forgot password?</ForgotPasswordLink>
      </ForgotPasswordRow>

      <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
};
