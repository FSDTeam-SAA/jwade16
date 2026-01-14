import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  hasContributed: boolean;
  setContributionData: (data: Partial<ContributionData>) => void;
  setHasContributed: (status: boolean) => void;
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

export const useContributionStore = create<ContributionStore>()(
  persist(
    (set) => ({
      data: initialData,
      hasContributed: false,
      setContributionData: (updates) =>
        set((state) => ({ data: { ...state.data, ...updates } })),
      setHasContributed: (hasContributed) => set({ hasContributed }),
      reset: () => set({ data: initialData }),
    }),
    {
      name: "contribution-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
