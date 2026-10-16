import * as React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Field = styled.input`
  width: 100%;
  max-width: 20rem;
  height: 3.5rem;
  padding: 0 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.card};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast}, box-shadow ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    letter-spacing: normal;
    text-indent: 0;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.muted.foreground};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  }
`;

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const OtpInput = ({ length = 6, value, onChange, disabled }: OtpInputProps) => {
  const ref = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleChange = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, "").slice(0, length);
    onChange(digits);
  };

  return (
    <Wrap>
      <Field
        ref={ref}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={(e) => e.target.select()}
        disabled={disabled}
        maxLength={length}
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder={"•".repeat(length)}
      />
    </Wrap>
  );
};
