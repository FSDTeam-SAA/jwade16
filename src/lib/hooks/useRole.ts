import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllRole, postOccupationMatch } from "../api";

// get role
export const useGetRole = () => {
  return useQuery({
    queryKey: ["role"],
    queryFn: () => getAllRole(),
  });
};

// post occupation match
export const usePostOccupationMatch = () => {
  return useMutation({
    mutationFn: (data: { text: string }) => postOccupationMatch(data),
  });
};
