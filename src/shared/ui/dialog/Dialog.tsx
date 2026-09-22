import { createContext, useContext, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { X } from "lucide-react";

interface DialogContextValue {
  onOpenChange: (open: boolean) => void;
}

const DialogCtx = createContext<DialogContextValue | undefined>(undefined);

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

// Dependency-free stand-in for a Radix-style dialog: same `open`/`onOpenChange`
// API shape so `Modal` (and anything else built on top) reads the same either way.
export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;
  return <DialogCtx.Provider value={{ onOpenChange }}>{children}</DialogCtx.Provider>;
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: ${({ theme }) => theme.zIndex.modal};
  animation: ${fadeIn} 150ms ease;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 2rem);
  max-width: 32rem;
  max-height: 90vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: 1.75rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.muted.foreground};
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const DialogContent = ({ children, hideClose }: { children: ReactNode; hideClose?: boolean }) => {
  const ctx = useContext(DialogCtx);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx?.onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ctx]);

  return createPortal(
    <>
      <Overlay onClick={() => ctx?.onOpenChange(false)} />
      <Content role="dialog" aria-modal="true">
        {children}
        {!hideClose && (
          <CloseButton aria-label="Close" onClick={() => ctx?.onOpenChange(false)} type="button">
            <X size={16} />
          </CloseButton>
        )}
      </Content>
    </>,
    document.body,
  );
};

export const DialogTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0 0 0.5rem;
`;

export const DialogDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0 0 1rem;
`;
