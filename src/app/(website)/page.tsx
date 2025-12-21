"use client";
import Banner from "@/components/website/PageSections/HomePage/Banner";
import { useQuestionnaireStore } from "@/store/useQuestionnaireStore";
import { useEffect } from "react";
// import PayPowerScore from "@/components/website/PageSections/PayPowerScore/PayPowerScore";

export default function Page() {
  const resetStore = useQuestionnaireStore((state) => state.reset);

  useEffect(() => {
    resetStore();
  }, [resetStore]);

  return (
    <div>
      <Banner />
      {/* <PayPowerScore /> */}
    </div>
  );
}
