import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { Input, PasswordInput, Button, FormField } from "@/shared/ui";
import type { NinLookupResult, RegisterPayload } from "../api/types";

const schema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().trim().email("Enter a valid email address"),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^(0[789][01]\d{8}|234[789][01]\d{8})$/, "Enter a valid Nigerian phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

interface AccountDetailsFormProps {
  ninResult: NinLookupResult;
  onSubmit: (payload: RegisterPayload) => Promise<void> | void;
}

const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" });
};

export const AccountDetailsForm = ({ ninResult, onSubmit }: AccountDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: ninResult.firstName,
      lastName: ninResult.lastName,
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submit = async (values: FormValues) => {
    const { confirmPassword: _confirmPassword, ...rest } = values;
    await onSubmit({
      nin: ninResult.nin,
      dateOfBirth: ninResult.dateOfBirth,
      ...rest,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormField label="National Identification Number (NIN)">
        <Input value={ninResult.nin} readOnly />
      </FormField>

      <FormField label="First Name" required error={errors.firstName?.message}>
        <Input placeholder="First name" {...register("firstName")} />
      </FormField>

      <FormField label="Last Name" required error={errors.lastName?.message}>
        <Input placeholder="Last name" {...register("lastName")} />
      </FormField>

      <FormField label="Date of Birth">
        <Input value={formatDate(ninResult.dateOfBirth)} readOnly />
      </FormField>

      <FormField label="Email Address" required error={errors.email?.message}>
        <Input type="email" placeholder="you@example.com" {...register("email")} />
      </FormField>

      <FormField label="Phone Number" required error={errors.phoneNumber?.message}>
        <Input type="tel" placeholder="08012345678" {...register("phoneNumber")} />
      </FormField>

      <FormField label="Password" required error={errors.password?.message}>
        <PasswordInput placeholder="At least 8 characters" {...register("password")} />
      </FormField>

      <FormField label="Confirm Password" required error={errors.confirmPassword?.message}>
        <PasswordInput placeholder="Re-enter your password" {...register("confirmPassword")} />
      </FormField>

      <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
        {isSubmitting ? (
          "Saving..."
        ) : (
          <>
            Save & Continue <ArrowRight size={18} />
          </>
        )}
      </Button>
    </form>
  );
};
