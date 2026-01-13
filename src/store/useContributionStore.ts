import { create } from "zustand";

interface ContributionData {
  jobTitle: string;
  baseSalary: string;
  location: string;
  yearsOfExperience: string;
  companyName: string;
  annualBonus: string;
  equity: string;
  jobLevel: string;
}

interface ContributionStore {
  data: ContributionData;
  setContributionData: (data: Partial<ContributionData>) => void;
  reset: () => void;
}

const initialData: ContributionData = {
  jobTitle: "",
  baseSalary: "",
  location: "",
  yearsOfExperience: "",
  companyName: "",
  annualBonus: "",
  equity: "",
  jobLevel: "",
};

export const useContributionStore = create<ContributionStore>((set) => ({
  data: initialData,
  setContributionData: (updates) =>
    set((state) => ({ data: { ...state.data, ...updates } })),
  reset: () => set({ data: initialData }),
}));
