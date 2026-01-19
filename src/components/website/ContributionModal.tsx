"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContributionModal({
  delay = 2000,
}: {
  delay?: number;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const actualDelay = delay === 0 ? 800 : delay;

    const timer = setTimeout(() => {
      // 1. Check if user already did the flow in this session/lifetime
      const hasVisitedContribution = localStorage.getItem(
        "has_visited_contribution"
      );

      // If flag is true, do NOT show
      if (hasVisitedContribution === "true") {
        return;
      }

      // If flag is false or not set, SHOW (User requirements: "If ... not set or is false, show the modal")
      setOpen(true);
    }, actualDelay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleContribute = () => {
    setOpen(false);
    router.push("/contribution");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Contribute Anonymously</DialogTitle>
      <DialogContent className="sm:max-w-120 p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
        <div className="absolute inset-0 bg-linear-to-br from-[#005DAA]/5 to-[#00C8B3]/5 pointer-events-none" />

        <div className="flex flex-col items-center text-center p-8 sm:p-10 relative z-10">
          <div className="w-16 h-16 bg-linear-to-br from-[#005DAA]/10 to-[#00C8B3]/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm cursor-pointer">
            <Sparkles className="w-8 h-8 text-[#005DAA] cursor-pointer" />
          </div>

          <DialogHeader className="mb-6 space-y-4 text-center">
            <div className="space-y-4">
              <DialogDescription className="text-base text-gray-600 max-w-sm mx-auto text-center font-medium">
                Want to anonymously contribute your responses to help improve
                accuracy for everyone using COMPanion?
              </DialogDescription>

              <ul className="text-sm text-gray-500 space-y-2 flex flex-col items-center">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C8B3]" />
                  No names or contact information
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C8B3]" />
                  Used only in aggregate
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C8B3]" />
                  Completely optional
                </li>
              </ul>
            </div>
          </DialogHeader>

          <DialogFooter className="flex-col sm:flex-col gap-3 w-full">
            <Button
              onClick={handleContribute}
              className="w-full bg-linear-to-r from-[#005DAA] to-[#00C8B3] text-white font-semibold py-6 rounded-xl text-lg shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 cursor-pointer"
            >
              Contribute Anonymously
            </Button>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="w-full text-gray-500 border border-gray-500 hover:text-gray-900 py-4 hover:bg-transparent hover:border-gray-900 font-medium cursor-pointer"
            >
              Skip for Now
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
