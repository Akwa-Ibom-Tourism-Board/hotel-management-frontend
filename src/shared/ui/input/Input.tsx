import * as React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.foreground};
  padding: 0.65rem 0.9rem;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.card};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast}, box-shadow ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted.foreground};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  }

  &:disabled,
  &:read-only {
    opacity: 0.7;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <StyledInput ref={ref} {...props} />,
);
Input.displayName = "Input";
