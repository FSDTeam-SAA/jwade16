// useRole.ts

import { useQuery } from "@tanstack/react-query";
import { getAllRole } from "../api";

// get role
export const useGetRole = () => {
  return useQuery({
    queryKey: ["role"],
    queryFn: () => getAllRole(),
  });
};
