// src/lib/services/authService.ts

import axiosInstance from "../instance/axios-instance";

// POST Contribution
export interface ContributionPayload {
  companyName: string;
  jobTitle: string;
  location: string;
  jobLevel: string;
  baseSalary: number;
  annualBonus: number;
  yearsOfExperience: number;
  equity: string;
}

// POST Contribution
export const contributionService = {
  createContribution: (data: ContributionPayload) => {
    return axiosInstance.post("/compensation", data);
  },
  deleteContribution: (id: string) => {
    return axiosInstance.delete(`/compensation/${id}`);
  },
};

// GET Contribution
export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ContributionResponse {
  data: ContributionPayload[];
  pagination: PaginationData;
}

export const getContributionService = {
  getContributions: (page: number = 1, limit: number = 10) => {
    return axiosInstance.get(`/compensation?page=${page}&limit=${limit}`);
  },
};
