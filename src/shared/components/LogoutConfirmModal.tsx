import styled from "styled-components";
import { LogOut, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, Button } from "@/shared/ui";
import { media, spin } from "@/theme";

const IconWrap = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.12)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.75rem;
  flex-direction: column;

  ${media.sm} {
    flex-direction: row;
  }
`;

const ActionButton = styled(Button)`
  flex: 1;
  min-height: 3rem;
`;

const Spin = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

interface LogoutConfirmModalProps {
  open: boolean;
  isLoggingOut: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmModal = ({ open, isLoggingOut, onCancel, onConfirm }: LogoutConfirmModalProps) => (
  <Dialog open={open} onOpenChange={(next) => !next && onCancel()}>
    <DialogContent hideClose={isLoggingOut}>
      <IconWrap>
        <LogOut size={22} />
      </IconWrap>
      <DialogTitle>Log out and exit?</DialogTitle>
      <DialogDescription>You will need to log in again to access your dashboard.</DialogDescription>
      <Actions>
        <ActionButton variant="outline" fullWidth onClick={onCancel} disabled={isLoggingOut}>
          Stay Logged In
        </ActionButton>
        <ActionButton variant="secondary" fullWidth onClick={onConfirm} disabled={isLoggingOut}>
          {isLoggingOut ? (
            <>
              <Spin size={18} /> Logging out...
            </>
          ) : (
            "Log Out"
          )}
        </ActionButton>
      </Actions>
    </DialogContent>
  </Dialog>
);
