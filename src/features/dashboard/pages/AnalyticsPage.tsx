import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Building2, BadgeCheck, BadgeX, FileClock } from "lucide-react";
import { DashboardShell } from "@/shared/components";
import { PageLoader } from "@/shared/components";
import { media } from "@/theme";
import { getAnalyticsSummary } from "../api";
import { StatCard } from "../components/StatCard";
import { StatusDoughnutChart, EntityTypeBarChart } from "../components/StatusChart";
import { ExportMenu } from "../components/ExportMenu";

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 0 0.75rem;
`;

const ErrorNote = styled.p`
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
`;

export const AnalyticsPage = () => {
  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ["analytics-summary"],
    queryFn: getAnalyticsSummary,
  });

  return (
    <DashboardShell title="Analytics">
      {isLoading && <PageLoader title="Loading your analytics..." />}

      {isError && (
        <ErrorNote>We could not load your analytics right now, please refresh the page to try again.</ErrorNote>
      )}

      {summary && (
        <>
          <StatGrid>
            <StatCard icon={<Building2 size={20} />} label="Total Establishments" value={summary.total} tone="primary" />
            <StatCard icon={<BadgeCheck size={20} />} label="Licensed" value={summary.licensed} tone="success" />
            <StatCard icon={<BadgeX size={20} />} label="Unlicensed" value={summary.unlicensed} tone="warning" />
            <StatCard icon={<FileClock size={20} />} label="Drafts" value={summary.drafts} tone="muted" />
          </StatGrid>

          <ChartGrid>
            <StatusDoughnutChart summary={summary} />
            <EntityTypeBarChart summary={summary} />
          </ChartGrid>

          <SectionTitle>Download Reports</SectionTitle>
          <ExportMenu />
        </>
      )}
    </DashboardShell>
  );
};
