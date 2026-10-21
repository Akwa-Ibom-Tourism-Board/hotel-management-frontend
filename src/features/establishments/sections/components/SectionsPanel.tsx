import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui";
import { PageLoader } from "@/shared/components";
import type { EntityTypeValue } from "@/shared/content";
import { getSectionsSummary } from "../api";
import { getReportingYears } from "../types";
import type { SectionStatus } from "../types";
import { AccommodationSection } from "./AccommodationSection";
import { EmploymentStatsSection } from "./EmploymentStatsSection";
import { WageStatsSection } from "./WageStatsSection";
import { GuestArrivalsSection } from "./GuestArrivalsSection";
import { OccupancySection } from "./OccupancySection";
import { RoomRatesSection } from "./RoomRatesSection";
import { YearTabs } from "./YearTabs";
import { PanelWrap, PanelHeading, PanelTitle, PanelSubtitle, ErrorText } from "./SectionsPanel.styles";

interface SectionsPanelProps {
  establishmentId: string;
  entityType: EntityTypeValue;
}

type YearStatusMap = Record<number, SectionStatus | undefined>;

const toYearStatusMap = (entries: { reportingYear: number; status: SectionStatus }[]): YearStatusMap =>
  entries.reduce<YearStatusMap>((acc, entry) => {
    acc[entry.reportingYear] = entry.status;
    return acc;
  }, {});

export const SectionsPanel = ({ establishmentId, entityType }: SectionsPanelProps) => {
  // Sections only apply to hotels for now — every other entity type gets
  // nothing here.
  const isHotel = entityType === "hotel";

  const years = useMemo(() => getReportingYears(), []);
  const [selectedYear, setSelectedYear] = useState(() => {
    const currentYear = new Date().getFullYear();
    return years.includes(currentYear) ? currentYear : years[years.length - 1];
  });

  const {
    data: summary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sections-summary", establishmentId],
    queryFn: () => getSectionsSummary(establishmentId),
    enabled: isHotel,
  });

  const employmentStatusByYear = useMemo(() => toYearStatusMap(summary?.employmentStats ?? []), [summary]);
  const wageStatusByYear = useMemo(() => toYearStatusMap(summary?.wageStats ?? []), [summary]);
  const guestArrivalStatusByYear = useMemo(() => toYearStatusMap(summary?.guestArrivalStats ?? []), [summary]);
  const occupancyStatusByYear = useMemo(() => toYearStatusMap(summary?.occupancyStats ?? []), [summary]);
  const roomRatesStatusByYear = useMemo(() => toYearStatusMap(summary?.roomRates ?? []), [summary]);

  // A single year-tab row drives all the yearly sections below it; its dot
  // for a given year combines their statuses so one tab can still mean
  // something, rather than tracking five independent year pickers.
  const combinedStatusByYear = useMemo(() => {
    const sources: YearStatusMap[] = [
      employmentStatusByYear,
      wageStatusByYear,
      guestArrivalStatusByYear,
      occupancyStatusByYear,
      roomRatesStatusByYear,
    ];

    return years.reduce<YearStatusMap>((acc, year) => {
      const statuses = sources.map((source) => source[year]).filter((value): value is SectionStatus => Boolean(value));
      if (statuses.length === 0) {
        acc[year] = undefined;
      } else if (statuses.length === sources.length && statuses.every((value) => value === "complete")) {
        acc[year] = "complete";
      } else {
        acc[year] = "draft";
      }
      return acc;
    }, {});
  }, [years, employmentStatusByYear, wageStatusByYear, guestArrivalStatusByYear, occupancyStatusByYear, roomRatesStatusByYear]);

  // Sections are hotel-only for now.
  if (!isHotel) return null;

  return (
    <PanelWrap>
      <PanelHeading>
        <PanelTitle>Sections</PanelTitle>
        <PanelSubtitle>
          Keep your accommodation details and yearly statistics up to date; the tourism board uses these to track
          activity across the state.
        </PanelSubtitle>
      </PanelHeading>

      {isLoading && <PageLoader title="Loading sections..." />}
      {isError && <ErrorText>We could not load this establishment's sections, please try again.</ErrorText>}

      {summary && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Accommodation</CardTitle>
              <CardDescription>Rooms and beds by category. This does not change by reporting year.</CardDescription>
            </CardHeader>
            <CardContent>
              <AccommodationSection establishmentId={establishmentId} status={summary.accommodation.status} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reporting Year</CardTitle>
              <CardDescription>Choose a year to view or update its yearly statistics below.</CardDescription>
            </CardHeader>
            <CardContent>
              <YearTabs
                years={years}
                statusByYear={combinedStatusByYear}
                selectedYear={selectedYear}
                onSelectYear={setSelectedYear}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employment Statistics</CardTitle>
              <CardDescription>Staff headcount by category.</CardDescription>
            </CardHeader>
            <CardContent>
              <EmploymentStatsSection
                establishmentId={establishmentId}
                year={selectedYear}
                status={employmentStatusByYear[selectedYear]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wage and Salary</CardTitle>
              <CardDescription>Total wages paid to staff.</CardDescription>
            </CardHeader>
            <CardContent>
              <WageStatsSection
                establishmentId={establishmentId}
                year={selectedYear}
                status={wageStatusByYear[selectedYear]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guest Arrival Statistics</CardTitle>
              <CardDescription>Where your guests travelled from.</CardDescription>
            </CardHeader>
            <CardContent>
              <GuestArrivalsSection
                establishmentId={establishmentId}
                year={selectedYear}
                status={guestArrivalStatusByYear[selectedYear]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Occupancy and Guest-Night Statistics</CardTitle>
              <CardDescription>Room nights and occupancy rate.</CardDescription>
            </CardHeader>
            <CardContent>
              <OccupancySection
                establishmentId={establishmentId}
                year={selectedYear}
                status={occupancyStatusByYear[selectedYear]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rates of Rooms per Year</CardTitle>
              <CardDescription>A rate for each room category, per reporting year.</CardDescription>
            </CardHeader>
            <CardContent>
              <RoomRatesSection
                establishmentId={establishmentId}
                year={selectedYear}
                status={roomRatesStatusByYear[selectedYear]}
              />
            </CardContent>
          </Card>
        </>
      )}
    </PanelWrap>
  );
};
