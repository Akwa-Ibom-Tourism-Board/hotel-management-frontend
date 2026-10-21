import { httpClient } from "@/shared/lib";
import type {
  SectionsSummary,
  AccommodationData,
  AccommodationPayload,
  EmploymentStatsData,
  EmploymentStatsPayload,
  WageStatsData,
  WageStatsPayload,
  GuestArrivalsData,
  GuestArrivalsPayload,
  OccupancyData,
  OccupancyPayload,
  RoomRatesData,
  RoomRatesPayload,
} from "./types";

export const getSectionsSummary = async (establishmentId: string): Promise<SectionsSummary> => {
  const { data } = await httpClient.get(`/establishments/${establishmentId}/sections-summary`);
  return data.data;
};

export const getAccommodation = async (establishmentId: string): Promise<AccommodationData> => {
  const { data } = await httpClient.get(`/establishments/${establishmentId}/accommodation`);
  return data.data;
};

export const updateAccommodation = async (
  establishmentId: string,
  payload: AccommodationPayload,
): Promise<AccommodationData> => {
  const { data } = await httpClient.put(`/establishments/${establishmentId}/accommodation`, payload);
  return data.data;
};

export const getEmploymentStats = async (establishmentId: string, year: number): Promise<EmploymentStatsData> => {
  const { data } = await httpClient.get(`/establishments/${establishmentId}/employment-stats`, { params: { year } });
  return data.data;
};

export const updateEmploymentStats = async (
  establishmentId: string,
  payload: EmploymentStatsPayload,
): Promise<EmploymentStatsData> => {
  const { data } = await httpClient.put(`/establishments/${establishmentId}/employment-stats`, payload);
  return data.data;
};

export const getWageStats = async (establishmentId: string, year: number): Promise<WageStatsData> => {
  const { data } = await httpClient.get(`/establishments/${establishmentId}/wage-stats`, { params: { year } });
  return data.data;
};

export const updateWageStats = async (establishmentId: string, payload: WageStatsPayload): Promise<WageStatsData> => {
  const { data } = await httpClient.put(`/establishments/${establishmentId}/wage-stats`, payload);
  return data.data;
};

export const getGuestArrivals = async (establishmentId: string, year: number): Promise<GuestArrivalsData> => {
  const { data } = await httpClient.get(`/establishments/${establishmentId}/guest-arrivals`, { params: { year } });
  return data.data;
};

export const updateGuestArrivals = async (
  establishmentId: string,
  payload: GuestArrivalsPayload,
): Promise<GuestArrivalsData> => {
  const { data } = await httpClient.put(`/establishments/${establishmentId}/guest-arrivals`, payload);
  return data.data;
};

export const getOccupancy = async (establishmentId: string, year: number): Promise<OccupancyData> => {
  const { data } = await httpClient.get(`/establishments/${establishmentId}/occupancy`, { params: { year } });
  return data.data;
};

export const updateOccupancy = async (establishmentId: string, payload: OccupancyPayload): Promise<OccupancyData> => {
  const { data } = await httpClient.put(`/establishments/${establishmentId}/occupancy`, payload);
  return data.data;
};

export const getRoomRates = async (establishmentId: string, year: number): Promise<RoomRatesData> => {
  const { data } = await httpClient.get(`/establishments/${establishmentId}/room-rates`, { params: { year } });
  return data.data;
};

export const updateRoomRates = async (establishmentId: string, payload: RoomRatesPayload): Promise<RoomRatesData> => {
  const { data } = await httpClient.put(`/establishments/${establishmentId}/room-rates`, payload);
  return data.data;
};
