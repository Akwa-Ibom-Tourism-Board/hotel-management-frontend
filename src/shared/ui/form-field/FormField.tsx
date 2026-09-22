import type { ReactNode } from "react";
import styled from "styled-components";
import { Label } from "../label";

const Field = styled.div`
  margin-bottom: 1.1rem;
`;

const ErrorText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  margin: 0.35rem 0 0;
`;

const HintText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: -0.15rem 0 0.4rem;
`;

interface FormFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export const FormField = ({ label, required, optional, error, hint, children }: FormFieldProps) => (
  <Field>
    <Label $required={required} $optional={optional}>
      {label}
    </Label>
    {hint && <HintText>{hint}</HintText>}
    {children}
    {error && <ErrorText>{error}</ErrorText>}
  </Field>
);
