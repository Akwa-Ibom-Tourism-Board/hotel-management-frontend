/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../axiosInstance";


export const registerEstablishments = async (formData: Record<string, any>) => {
     const response = await axiosInstance.post("/establishments/register", formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}


// export const verifyUserOtp = async (formData: {
//     email: string,
//     otp: string,
// }) => {
//      const response = await axiosInstance.post("/users/auth/verify-user", formData, {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     return response.data;
// }


// export const resendUserOtp = async (formData: {
//     email: string,
// }) => {
//      const response = await axiosInstance.post("/users/auth/resend-verification-otp", formData, {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     return response.data;
// }