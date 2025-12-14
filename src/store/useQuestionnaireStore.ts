import { create } from "zustand";

interface QuestionnaireState {
  currentStep: number;
  answers: Record<string, string>;
  email: string;
  payPowerScore: number | null;
  marketGapDetected: string | null;
  setAnswer: (id: string, value: string) => void;
  setCurrentStep: (step: number) => void;
  setEmail: (email: string) => void;
  setScoreResults: (score: number, gap: string) => void;
  reset: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>((set) => ({
  currentStep: 0,
  answers: {},
  email: "",
  payPowerScore: null,
  marketGapDetected: null,
  setAnswer: (id, value) =>
    set((state) => ({
      answers: { ...state.answers, [id]: value },
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  setEmail: (email) => set({ email }),
  setScoreResults: (score, gap) =>
    set({ payPowerScore: score, marketGapDetected: gap }),
  reset: () =>
    set({
      currentStep: 0,
      answers: {},
      email: "",
      payPowerScore: null,
      marketGapDetected: null,
    }),
}));
