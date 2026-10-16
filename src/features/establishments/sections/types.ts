export type SectionStatus = "draft" | "complete";

// Reporting data starts from 2024 through the current year.
const REPORTING_YEAR_START = 2024;

export const getReportingYears = (): number[] => {
  const end = new Date().getFullYear();
  const years: number[] = [];
  for (let year = REPORTING_YEAR_START; year <= end; year += 1) {
    years.push(year);
  }
  return years;
};

export interface SectionsSummary {
  accommodation: { hasData: boolean; status: SectionStatus | null };
  employmentStats: { reportingYear: number; status: SectionStatus }[];
  wageStats: { reportingYear: number; status: SectionStatus }[];
  guestArrivalStats: { reportingYear: number; status: SectionStatus }[];
  occupancyStats: { reportingYear: number; status: SectionStatus }[];
}

// -- Accommodation -----------------------------------------------------

export const ACCOMMODATION_CATEGORY_OPTIONS = [
  { value: "single_rooms", label: "Single Rooms" },
  { value: "double_rooms", label: "Double Rooms" },
  { value: "executive", label: "Executive" },
  { value: "suites", label: "Suites" },
  { value: "apartments", label: "Apartments" },
] as const;

export interface AccommodationCategoryRow {
  id: string;
  establishmentId: string;
  category: string;
  categoryLabel: string;
  roomCount: number | null;
  bedCount: number | null;
  status: SectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AccommodationData {
  categories: AccommodationCategoryRow[];
  totals: { roomCount: number; bedCount: number };
}

export interface AccommodationCategoryInput {
  category: string;
  categoryLabel: string;
  roomCount?: number | null;
  bedCount?: number | null;
}

export interface AccommodationPayload {
  status: SectionStatus;
  categories: AccommodationCategoryInput[];
}

// -- Employment statistics ----------------------------------------------

export const EMPLOYMENT_CATEGORY_OPTIONS = [
  { value: "management", label: "Management" },
  { value: "technical_professional", label: "Technical / Professional" },
  { value: "administrative", label: "Administrative" },
  { value: "front_desk", label: "Front Desk" },
  { value: "housekeeping", label: "Housekeeping" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "security", label: "Security" },
  { value: "maintenance", label: "Maintenance" },
] as const;

export interface EmploymentStatRow {
  id: string;
  establishmentId: string;
  reportingYear: number;
  category: string;
  categoryLabel: string;
  akwaIbomIndigenes: number | null;
  nonIndigenes: number | null;
  foreignEmployees: number | null;
  status: SectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EmploymentStatsData {
  reportingYear: number;
  categories: EmploymentStatRow[];
  totals: { akwaIbomIndigenes: number; nonIndigenes: number; foreignEmployees: number };
}

export interface EmploymentStatInput {
  category: string;
  categoryLabel: string;
  akwaIbomIndigenes?: number | null;
  nonIndigenes?: number | null;
  foreignEmployees?: number | null;
}

export interface EmploymentStatsPayload {
  reportingYear: number;
  status: SectionStatus;
  categories: EmploymentStatInput[];
}

// -- Wage and salary ------------------------------------------------------

export interface WageStatsData {
  reportingYear: number;
  status: SectionStatus;
  employeesPaidCount: number | null;
  totalWageSalary: number | null;
  averageMonthlyWage: number;
}

export interface WageStatsPayload {
  reportingYear: number;
  status: SectionStatus;
  employeesPaidCount?: number | null;
  totalWageSalary?: number | null;
}

// -- Guest arrival statistics ---------------------------------------------

export interface GuestArrivalsData {
  reportingYear: number;
  status: SectionStatus;
  akwaIbomResidents: number | null;
  otherNigerianStates: number | null;
  internationalGuests: number | null;
  mostStateOfArrival: string | null;
  mostCountryOfArrival: string | null;
  totalGuests: number;
}

export interface GuestArrivalsPayload {
  reportingYear: number;
  status: SectionStatus;
  akwaIbomResidents?: number | null;
  otherNigerianStates?: number | null;
  internationalGuests?: number | null;
  mostStateOfArrival?: string | null;
  mostCountryOfArrival?: string | null;
}

// -- Occupancy and guest-night statistics ----------------------------------

export interface OccupancyData {
  reportingYear: number;
  status: SectionStatus;
  availableRooms: number | null;
  roomNightsAvailable: number | null;
  roomNightsSold: number | null;
  totalGuestNights: number | null;
  occupancyRate: number;
}

export interface OccupancyPayload {
  reportingYear: number;
  status: SectionStatus;
  availableRooms?: number | null;
  roomNightsAvailable?: number | null;
  roomNightsSold?: number | null;
  totalGuestNights?: number | null;
}

// -- Shared category-table row shape (Accommodation + Employment) ---------

export interface CategoryOptionSpec {
  value: string;
  label: string;
}

export interface CategoryFieldSpec {
  key: string;
  label: string;
}

export interface CategoryTableRow {
  // Stable React key: the server row id once saved, or a client-generated
  // id for a row that has been added but not saved yet.
  rowKey: string;
  category: string;
  categoryLabel: string;
  values: Record<string, number | null>;
}
