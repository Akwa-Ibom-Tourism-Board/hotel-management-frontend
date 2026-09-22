import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { DashboardShell, PageLoader } from "@/shared/components";
import { listMyEstablishments } from "@/features/establishments/api";
import { EstablishmentsTable } from "@/features/establishments/components/EstablishmentsTable";
import type { Establishment, RegistrationStatus } from "@/features/establishments/api/types";

const SectionHeading = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 0 0.75rem;

  &:not(:first-child) {
    margin-top: 2rem;
  }
`;

const Count = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.4rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.75rem;
  font-weight: 700;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
`;

const GROUPS: { status: RegistrationStatus; label: string }[] = [
  { status: "Pending", label: "Awaiting Review" },
  { status: "Approved", label: "Licensed" },
  { status: "Rejected", label: "Rejected" },
  { status: "Draft", label: "Drafts" },
];

export const LicensingStatusPage = () => {
  const {
    data: establishments = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ["my-establishments"], queryFn: listMyEstablishments });

  const grouped = useMemo(() => {
    const map = new Map<RegistrationStatus, Establishment[]>();
    for (const group of GROUPS) map.set(group.status, []);
    for (const establishment of establishments) {
      map.get(establishment.registrationStatus)?.push(establishment);
    }
    return map;
  }, [establishments]);

  return (
    <DashboardShell title="Licensing Status">
      {isLoading && <PageLoader title="Loading licensing status..." />}
      {isError && <ErrorText>We could not load your licensing status right now, please refresh the page.</ErrorText>}

      {!isLoading &&
        !isError &&
        GROUPS.map((group) => {
          const items = grouped.get(group.status) ?? [];
          if (items.length === 0) return null;
          return (
            <div key={group.status}>
              <SectionHeading>
                {group.label} <Count>{items.length}</Count>
              </SectionHeading>
              <EstablishmentsTable establishments={items} />
            </div>
          );
        })}

      {!isLoading && !isError && establishments.length === 0 && (
        <EmptyText>You have not added any establishments yet; once you do, their licensing status will show up here.</EmptyText>
      )}
    </DashboardShell>
  );
};
