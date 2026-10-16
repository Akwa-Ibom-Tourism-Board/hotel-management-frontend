import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Card, PasswordInput, Button, FormField, toast } from "@/shared/ui";
import { Container } from "@/shared/components";
import { changePassword } from "@/features/profile/api";
import { useAuth } from "../context/AuthContext";

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  padding: 2rem 0;
`;

const CardWrap = styled(Card)`
  max-width: 28rem;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

const IconWrap = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.12)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

const Title = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 0 0.5rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  line-height: 1.5;
  margin: 0 0 1.5rem;
`;

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

export const ForcePasswordChangePage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      await refreshUser();
      toast.success("Your password has been changed");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not change your password",
      );
    }
  };

  return (
    <Wrap>
      <Container>
        <CardWrap>
          <IconWrap>
            <ShieldAlert size={24} />
          </IconWrap>
          <Title>Set a new password</Title>
          <Description>
            Your account was set up by an administrator with a temporary
            password. For security, please set your own password before
            continuing to the dashboard.
          </Description>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Current Password" required error={errors.currentPassword?.message}>
              <PasswordInput placeholder="The temporary password you were given" {...register("currentPassword")} />
            </FormField>

            <FormField label="New Password" required error={errors.newPassword?.message}>
              <PasswordInput placeholder="At least 8 characters" {...register("newPassword")} />
            </FormField>

            <FormField label="Confirm New Password" required error={errors.confirmNewPassword?.message}>
              <PasswordInput {...register("confirmNewPassword")} />
            </FormField>

            <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Set Password & Continue"}
            </Button>
          </form>
        </CardWrap>
      </Container>
    </Wrap>
  );
};
