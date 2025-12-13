// usePayPower.ts

import { useMutation } from "@tanstack/react-query";
import { postPayPower, PayPowerPayload } from "../api";

export const usePostPayPower = () => {
  return useMutation({
    mutationFn: (data: PayPowerPayload) => postPayPower(data),
  });
};
