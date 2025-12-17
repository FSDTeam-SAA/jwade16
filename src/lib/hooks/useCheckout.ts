// useCheckout.ts

import { useMutation } from "@tanstack/react-query";
import { postCheckoutSession, CheckoutSessionPayload } from "../api";

export const usePostCheckoutSession = () => {
  return useMutation({
    mutationFn: (data: CheckoutSessionPayload) => postCheckoutSession(data),
  });
};
