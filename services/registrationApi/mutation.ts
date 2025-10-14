/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  // useQueryClient 
} from "@tanstack/react-query";
// import { queryKeys } from './queryKeys';
import { registerEstablishments } from './api';
// import {toast} from 'react-toastify';


export function useRegisterEstablishments() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerEstablishments,
    onSuccess: async (
      // data
    ) => {
      //   toast.success(data?.message || "Service Request Created Successfully");
      // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
    },
    onError: (error: any) => {
      console.error('Error Registering User:', error);
      //   toast.error(error?.response?.data?.message || "Error creating space");
    },
  });
}

// export function useVerifyUserEmail() {
//   // const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: verifyUserOtp,
//     onSuccess: async (
//       // data
//     ) => {
//       //   toast.success(data?.message || "Service Request Created Successfully");
//       // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
//     },
//     onError: (error: any) => {
//       console.error('Error verifying email address:', error);
//       //   toast.error(error?.response?.data?.message || "Error creating space");
//     },
//   });
// }

// export function useResendVerificationOtp() {
//   // const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: resendUserOtp,
//     onSuccess: async (
//       // data
//     ) => {
//       //   toast.success(data?.message || "Service Request Created Successfully");
//       // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
//     },
//     onError: (error: any) => {
//       console.error('Error creating Service Request:', error);
//       //   toast.error(error?.response?.data?.message || "Error creating space");
//     },
//   });
// }