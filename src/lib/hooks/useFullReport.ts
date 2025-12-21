// use full report

import { useQuery } from "@tanstack/react-query";
import { getFullReport } from "../api";

// use full report
export const useFullReport = (score: number) => {
  return useQuery({
    queryKey: ["full-report", score],
    queryFn: () => getFullReport(score),
  });
};
