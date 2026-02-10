// use full report

import { useQuery } from "@tanstack/react-query";
import { getFullReport, getFreePayPowerReport } from "../api";

// use paid full report
export const useFullReport = (score: number) => {
  return useQuery({
    queryKey: ["full-report", score],
    queryFn: () => getFullReport(score),
  });
};


// use free full report
export const useFreeFullReport = (score: number) => {
  return useQuery({
    queryKey: ["free-full-report", score],
    queryFn: () => getFreePayPowerReport(score),
  });
};
