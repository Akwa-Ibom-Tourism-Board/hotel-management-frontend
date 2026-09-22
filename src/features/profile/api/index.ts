import { httpClient } from "@/shared/lib";
import type { User } from "@/features/auth/api/types";
import type { UpdateProfilePayload, ChangePasswordPayload } from "./types";

export const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
  const { data } = await httpClient.patch("/auth/me", payload);
  return data.data;
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<void> => {
  await httpClient.post("/auth/change-password", payload);
};
