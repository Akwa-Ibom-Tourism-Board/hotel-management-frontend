import styled from "styled-components";
import { UserRound } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, Button } from "@/shared/ui";
import { media } from "@/theme";
import type { NinLookupResult } from "../api/types";

const IconWrap = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

const DetailsList = styled.dl`
  margin: 1rem 0 0;
  padding: 1rem 1.1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
`;

const Dt = styled.dt`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted.foreground};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Dd = styled.dd`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-direction: column;

  ${media.sm} {
    flex-direction: row;
  }
`;

const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" });
};

interface NinResultModalProps {
  open: boolean;
  result: NinLookupResult | null;
  onContinue: () => void;
  onChangeNin: () => void;
}

export const NinResultModal = ({ open, result, onContinue, onChangeNin }: NinResultModalProps) => {
  if (!result) return null;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onChangeNin()}>
      <DialogContent hideClose>
        <IconWrap>
          <UserRound size={26} />
        </IconWrap>
        <DialogTitle>We found your details</DialogTitle>
        <DialogDescription>
          Confirm these match your identity before continuing; you can change your NIN if anything looks wrong.
        </DialogDescription>

        <DetailsList>
          <Dt>NIN</Dt>
          <Dd>{result.nin}</Dd>
          <Dt>First Name</Dt>
          <Dd>{result.firstName}</Dd>
          <Dt>Last Name</Dt>
          <Dd>{result.lastName}</Dd>
          <Dt>Date of Birth</Dt>
          <Dd>{formatDate(result.dateOfBirth)}</Dd>
        </DetailsList>

        <Actions>
          <Button variant="outline" fullWidth onClick={onChangeNin} type="button">
            Change NIN
          </Button>
          <Button fullWidth onClick={onContinue} type="button">
            Continue
          </Button>
        </Actions>
      </DialogContent>
    </Dialog>
  );
};
