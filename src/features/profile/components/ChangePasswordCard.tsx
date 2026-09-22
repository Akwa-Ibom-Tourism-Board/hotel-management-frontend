import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, PasswordInput, Button, FormField, toast } from "@/shared/ui";
import { changePassword } from "../api";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type FormValues = z.infer<typeof schema>;

export const ChangePasswordCard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
      toast.success("Your password has been changed");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not change your password");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Choose a strong password you have not used elsewhere.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Current Password" required error={errors.currentPassword?.message}>
            <PasswordInput {...register("currentPassword")} />
          </FormField>

          <FormField label="New Password" required error={errors.newPassword?.message}>
            <PasswordInput placeholder="At least 8 characters" {...register("newPassword")} />
          </FormField>

          <FormField label="Confirm New Password" required error={errors.confirmNewPassword?.message}>
            <PasswordInput {...register("confirmNewPassword")} />
          </FormField>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
