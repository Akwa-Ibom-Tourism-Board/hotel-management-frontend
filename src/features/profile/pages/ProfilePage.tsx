import styled from "styled-components";
import { DashboardShell } from "@/shared/components";
import { media } from "@/theme";
import { AccountDetailsCard } from "../components/AccountDetailsCard";
import { ChangePasswordCard } from "../components/ChangePasswordCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 60rem;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

export const ProfilePage = () => (
  <DashboardShell title="Profile">
    <Grid>
      <AccountDetailsCard />
      <ChangePasswordCard />
    </Grid>
  </DashboardShell>
);
