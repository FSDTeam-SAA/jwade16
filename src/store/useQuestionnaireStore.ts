import { create } from "zustand";

interface QuestionnaireState {
  currentStep: number;
  answers: Record<string, string>;
  email: string;
  setAnswer: (id: string, value: string) => void;
  setCurrentStep: (step: number) => void;
  setEmail: (email: string) => void;
  reset: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>((set) => ({
  currentStep: 0,
  answers: {},
  email: "",
  setAnswer: (id, value) =>
    set((state) => ({
      answers: { ...state.answers, [id]: value },
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  setEmail: (email) => set({ email }),
  reset: () => set({ currentStep: 0, answers: {}, email: "" }),
}));
