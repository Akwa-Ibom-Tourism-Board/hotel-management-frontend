import styled from "styled-components";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { useTheme } from "@/theme";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui";
import type { AnalyticsSummary } from "../api/types";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ChartWrap = styled.div`
  position: relative;
  height: 280px;
`;

interface StatusChartProps {
  summary: AnalyticsSummary;
}

export const StatusDoughnutChart = ({ summary }: StatusChartProps) => {
  const theme = useTheme();

  const data = {
    labels: ["Licensed", "Unlicensed", "Drafts"],
    datasets: [
      {
        data: [summary.licensed, summary.unlicensed, summary.drafts],
        backgroundColor: ["#22C55E", theme.colors.secondary.DEFAULT, theme.colors.gray500],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrap>
          <Doughnut
            data={data}
            options={{
              maintainAspectRatio: false,
              plugins: { legend: { position: "bottom", labels: { color: theme.colors.foreground } } },
            }}
          />
        </ChartWrap>
      </CardContent>
    </Card>
  );
};

export const EntityTypeBarChart = ({ summary }: StatusChartProps) => {
  const theme = useTheme();
  const entries = Object.entries(summary.byEntityType);

  const data = {
    labels: entries.map(([type]) => type),
    datasets: [
      {
        label: "Establishments",
        data: entries.map(([, count]) => count),
        backgroundColor: theme.colors.primary.DEFAULT,
        borderRadius: 6,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>By Establishment Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrap>
          <Bar
            data={data}
            options={{
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { ticks: { color: theme.colors.muted.foreground }, grid: { display: false } },
                y: { ticks: { color: theme.colors.muted.foreground }, grid: { color: theme.colors.border } },
              },
            }}
          />
        </ChartWrap>
      </CardContent>
    </Card>
  );
};
