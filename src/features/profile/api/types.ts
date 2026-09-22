export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
