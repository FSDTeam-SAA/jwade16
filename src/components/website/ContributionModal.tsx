"use strict";
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

export default function ContributionModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user has already seen the modal in this session to avoid annoyance
    // For now, per requirements, just show it after 3 seconds.
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContribute = () => {
    setOpen(false);
    router.push("/contribution");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
        <div className="absolute inset-0 bg-linear-to-br from-[#005DAA]/5 to-[#00C8B3]/5 pointer-events-none" />

        <div className="flex flex-col items-center text-center p-8 sm:p-10 relative z-10">
          <div className="w-16 h-16 bg-linear-to-br from-[#005DAA]/10 to-[#00C8B3]/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm cursor-pointer">
            <Sparkles className="w-8 h-8 text-[#005DAA] cursor-pointer" />
          </div>

          <DialogHeader className="mb-6 space-y-3 text-center">
            <DialogTitle className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#005DAA] to-[#00C8B3] leading-tight text-center">
              Unlock Your Potential
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 max-w-sm mx-auto text-center">
              Ready to make an impact? Join our community of contributors and
              help shape the future of pay transparency.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col sm:flex-col gap-3 w-full">
            <Button
              onClick={handleContribute}
              className="w-full bg-linear-to-r from-[#005DAA] to-[#00C8B3] text-white font-semibold py-6 rounded-xl text-lg shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 cursor-pointer"
            >
              Become a Contributor
            </Button>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="w-full text-gray-500 border border-gray-500 hover:text-gray-900 py-4 hover:bg-transparent hover:border-gray-900 font-medium cursor-pointer"
            >
              Maybe Later
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
