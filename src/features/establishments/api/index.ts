import { httpClient } from "@/shared/lib";
import type {
  Establishment,
  EstablishmentSearchResult,
  CreateEstablishmentPayload,
  BulkCreatePayload,
  BranchInput,
  Branch,
} from "./types";

export const searchEstablishments = async (query: string): Promise<EstablishmentSearchResult[]> => {
  const { data } = await httpClient.get("/establishments/search", { params: { q: query } });
  return data.data;
};

export const listMyEstablishments = async (): Promise<Establishment[]> => {
  const { data } = await httpClient.get("/establishments/mine");
  return data.data;
};

export const getEstablishment = async (id: string): Promise<Establishment> => {
  const { data } = await httpClient.get(`/establishments/${id}`);
  return data.data;
};

export const createEstablishment = async (payload: CreateEstablishmentPayload): Promise<Establishment> => {
  const { data } = await httpClient.post("/establishments", payload);
  return data.data;
};

export const updateEstablishment = async (id: string, payload: Partial<CreateEstablishmentPayload>): Promise<Establishment> => {
  const { data } = await httpClient.patch(`/establishments/${id}`, payload);
  return data.data;
};

// Attaching an unclaimed establishment to the current owner uses the same
// PATCH endpoint as a regular update; the backend claims it when ownerId is null.
export const claimEstablishment = async (id: string, payload: Partial<CreateEstablishmentPayload>): Promise<Establishment> =>
  updateEstablishment(id, payload);

export const bulkCreateEstablishments = async (payload: BulkCreatePayload): Promise<Establishment[]> => {
  const { data } = await httpClient.post("/establishments/bulk", payload);
  return data.data;
};

// Draft endpoints intentionally skip full validation server-side, so a
// draft can be saved with only some fields filled in.
export const createDraftEstablishment = async (payload: Partial<CreateEstablishmentPayload>): Promise<Establishment> => {
  const { data } = await httpClient.post("/establishments/draft", payload);
  return data.data;
};

export const updateDraftEstablishment = async (id: string, payload: Partial<CreateEstablishmentPayload>): Promise<Establishment> => {
  const { data } = await httpClient.patch(`/establishments/draft/${id}`, payload);
  return data.data;
};

// Validates the draft fully and transitions it from Draft to Pending.
export const submitDraftEstablishment = async (id: string, payload: CreateEstablishmentPayload): Promise<Establishment> => {
  const { data } = await httpClient.post(`/establishments/draft/${id}/submit`, payload);
  return data.data;
};

export const bulkSaveDraftEstablishments = async (payload: BulkCreatePayload): Promise<Establishment[]> => {
  const { data } = await httpClient.post("/establishments/bulk/draft", payload);
  return data.data;
};

export const addBranch = async (establishmentId: string, payload: BranchInput): Promise<Branch> => {
  const { data } = await httpClient.post(`/establishments/${establishmentId}/branches`, payload);
  return data.data;
};

export const updateBranch = async (branchId: string, payload: Partial<BranchInput>): Promise<Branch> => {
  const { data } = await httpClient.patch(`/establishments/branches/${branchId}`, payload);
  return data.data;
};

export const deleteBranch = async (branchId: string): Promise<void> => {
  await httpClient.delete(`/establishments/branches/${branchId}`);
};
