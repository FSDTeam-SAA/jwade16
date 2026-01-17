// useContribution.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  contributionService,
  getContributionService,
  ContributionPayload,
} from "../services/contributionService";

// POST Contribution
export const usePostContribution = () => {
  return useMutation({
    mutationFn: (data: ContributionPayload) =>
      contributionService.createContribution(data),
  });
};

// GET Contribution
export const useGetContribution = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["contribution", page, limit],
    queryFn: () => getContributionService.getContributions(page, limit),
  });
};

// DELETE Contribution
export const useDeleteContribution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => contributionService.deleteContribution(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribution"] });
    },
  });
};
