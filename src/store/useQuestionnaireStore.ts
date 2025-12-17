import { create } from "zustand";

interface QuestionnaireState {
  currentStep: number;
  answers: Record<string, string>;
  email: string;
  payPowerScore: number | null;
  marketGapDetected: string | null;
  userSelectionId: string | null;
  setAnswer: (id: string, value: string) => void;
  setCurrentStep: (step: number) => void;
  setEmail: (email: string) => void;
  setScoreResults: (score: number, gap: string, selectionId: string) => void;
  reset: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>((set) => ({
  currentStep: 0,
  answers: {},
  email: "",
  payPowerScore: null,
  marketGapDetected: null,
  userSelectionId: null,
  setAnswer: (id, value) =>
    set((state) => ({
      answers: { ...state.answers, [id]: value },
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  setEmail: (email) => set({ email }),
  setScoreResults: (score, gap, selectionId) =>
    set({
      payPowerScore: score,
      marketGapDetected: gap,
      userSelectionId: selectionId,
    }),
  reset: () =>
    set({
      currentStep: 0,
      answers: {},
      email: "",
      payPowerScore: null,
      marketGapDetected: null,
      userSelectionId: null,
    }),
}));
