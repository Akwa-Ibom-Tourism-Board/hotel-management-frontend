import * as React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  color: ${({ theme }) => theme.colors.foreground};
  padding: 0.75rem 0.9rem;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.card};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  outline: none;
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transitions.fast}, box-shadow ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted.foreground};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  }
`;

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => <StyledTextarea ref={ref} {...props} />,
);
Textarea.displayName = "Textarea";
