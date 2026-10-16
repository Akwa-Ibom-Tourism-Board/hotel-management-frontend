import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import styled from "styled-components";
import { Input, PasswordInput, Button, FormField } from "@/shared/ui";
import type { RegisterPayload } from "../api/types";

const schema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

interface AccountDetailsFormProps {
  onSubmit: (payload: RegisterPayload) => Promise<void> | void;
}

const Notice = styled.p`
  margin: 0 0 1.25rem;
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.8125rem;
  line-height: 1.5;
`;

export const AccountDetailsForm = ({ onSubmit }: AccountDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submit = async (values: FormValues) => {
    const { confirmPassword: _confirmPassword, ...rest } = values;
    await onSubmit(rest);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Notice>
        We recommend registering with your own email address rather than a
        shared or staff inbox. Your password is sent to that email, and you
        can invite your team or admin staff to the portal afterwards.
      </Notice>

      <FormField label="First Name" required error={errors.firstName?.message}>
        <Input placeholder="First name" {...register("firstName")} />
      </FormField>

      <FormField label="Last Name" required error={errors.lastName?.message}>
        <Input placeholder="Last name" {...register("lastName")} />
      </FormField>

      <FormField label="Email Address" required error={errors.email?.message}>
        <Input type="email" placeholder="you@example.com" {...register("email")} />
      </FormField>

      <FormField label="Password" required error={errors.password?.message}>
        <PasswordInput placeholder="At least 8 characters" {...register("password")} />
      </FormField>

      <FormField label="Confirm Password" required error={errors.confirmPassword?.message}>
        <PasswordInput placeholder="Re-enter your password" {...register("confirmPassword")} />
      </FormField>

      <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
        {isSubmitting ? (
          "Creating account..."
        ) : (
          <>
            Create Account <ArrowRight size={18} />
          </>
        )}
      </Button>
    </form>
  );
};
