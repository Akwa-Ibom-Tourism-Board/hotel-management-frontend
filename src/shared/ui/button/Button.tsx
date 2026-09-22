import { forwardRef, type ButtonHTMLAttributes } from "react";
import { StyledButton, type ButtonVariant, type ButtonSize } from "./Button.styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", fullWidth = false, ...props }, ref) => (
    <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} ref={ref} {...props} />
  ),
);
Button.displayName = "Button";
