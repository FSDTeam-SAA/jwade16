"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContributionStore } from "@/store/useContributionStore";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ContributionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContributionFormModal({
  open,
  onOpenChange,
}: ContributionFormModalProps) {
  const [step, setStep] = useState(1);
  const { data, setContributionData, reset } = useContributionStore();
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!data.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!data.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!data.location.trim()) newErrors.location = "Location is required";
    if (!data.jobLevel.trim()) newErrors.jobLevel = "Job level is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!data.baseSalary.trim())
      newErrors.baseSalary = "Base salary is required";
    if (!data.annualBonus.trim())
      newErrors.annualBonus = "Bonus amount is required";
    if (!data.equity.trim()) newErrors.equity = "Equity is required";
    if (!data.yearsOfExperience.trim())
      newErrors.yearsOfExperience = "Experience is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      console.log("Contribution Data Submitted:", data);

      // Success message show koranor jonno state
      setShowSuccess(true);

      // Store update
      useContributionStore.getState().setHasContributed(true);

      // 3 second pore next action
      setTimeout(() => {
        setShowSuccess(false);  
        onOpenChange(false);  
        reset();  
        setStep(1);  
        setErrors({}); 
        localStorage.setItem("has_visited_contribution", "true"); 

        // Success message dekhar por score page e redirect
        router.push("/score");
      }, 3000); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContributionData({ [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md border-none shadow-2xl bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
          <div className="w-24 h-24 bg-linear-to-tr from-[#00C8B3]/20 to-[#005DAA]/10 rounded-full flex items-center justify-center mb-6 animate-in zoom-in-50 duration-500 delay-150 ring-8 ring-white shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-[#00C8B3] drop-shadow-sm" />
          </div>
          <DialogTitle className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Thank You!
          </DialogTitle>
          <p className="text-gray-500 text-lg leading-relaxed max-w-[280px]">
            Your contribution helps make pay fair for everyone.
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
        {/* Header with Stepper */}
        <div className="bg-gray-50 border-b border-gray-100 p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-gray-900">
              Contribution Details
            </DialogTitle>
          </DialogHeader>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                  step >= 1
                    ? "bg-[#005DAA] text-white shadow-md shadow-[#005DAA]/20"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                1
              </div>
              <span
                className={`text-xs font-medium ${step >= 1 ? "text-[#005DAA]" : "text-gray-400"}`}
              >
                The Basics
              </span>
            </div>

            <div
              className={`w-16 h-1 rounded-full transition-colors duration-300 ${step > 1 ? "bg-[#005DAA]" : "bg-gray-200"}`}
            />

            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                  step >= 2
                    ? "bg-[#00C8B3] text-white shadow-md shadow-[#00C8B3]/20"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                2
              </div>
              <span
                className={`text-xs font-medium ${step >= 2 ? "text-[#00C8B3]" : "text-gray-400"}`}
              >
                The Details
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 pt-2">
          <div className="grid gap-6 py-4">
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="grid gap-2">
                  <Label
                    htmlFor="companyName"
                    className="text-gray-700 font-medium"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={data.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corp"
                    className={`h-12 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white transition-all ${
                      errors.companyName
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-[#005DAA]"
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs">{errors.companyName}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="jobTitle"
                    className="text-gray-700 font-medium"
                  >
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={data.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. Senior Product Manager"
                    className={`h-12 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white transition-all ${
                      errors.jobTitle
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-[#005DAA]"
                    }`}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-xs">{errors.jobTitle}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="location"
                    className="text-gray-700 font-medium"
                  >
                    Location (City / State){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    placeholder="e.g. New York, NY"
                    className={`h-12 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white transition-all ${
                      errors.location
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-[#005DAA]"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs">{errors.location}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="jobLevel"
                    className="text-gray-700 font-medium"
                  >
                    Job Level (e.g., L5, Senior){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="jobLevel"
                    name="jobLevel"
                    value={data.jobLevel}
                    onChange={handleChange}
                    placeholder="e.g. L5, Senior"
                    className={`h-12 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white transition-all ${
                      errors.jobLevel
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-[#00C8B3]"
                    }`}
                  />
                  {errors.jobLevel && (
                    <p className="text-red-500 text-xs">{errors.jobLevel}</p>
                  )}
                </div>
                <Button
                  onClick={handleNext}
                  className="w-full bg-linear-to-r from-[#005DAA] to-[#00C8B3] text-white h-12 cursor-pointer rounded-xl font-semibold shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200 mt-2"
                >
                  Next Step
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="grid gap-2">
                  <Label
                    htmlFor="baseSalary"
                    className="text-gray-700 font-medium"
                  >
                    Base Salary (e.g., 90,000){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="baseSalary"
                    name="baseSalary"
                    value={data.baseSalary}
                    onChange={handleChange}
                    placeholder="e.g. 150000"
                    type="number"
                    className={`h-12 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white transition-all ${
                      errors.baseSalary
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-[#005DAA]"
                    }`}
                  />
                  {errors.baseSalary && (
                    <p className="text-red-500 text-xs">{errors.baseSalary}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="annualBonus"
                    className="text-gray-700 font-medium"
                  >
                    Annual Bonus (e.g., 2,000){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="annualBonus"
                    name="annualBonus"
                    value={data.annualBonus}
                    onChange={handleChange}
                    placeholder="e.g. 20000"
                    type="number"
                    className={`h-12 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white transition-all ${
                      errors.annualBonus
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-[#00C8B3]"
                    }`}
                  />
                  {errors.annualBonus && (
                    <p className="text-red-500 text-xs">{errors.annualBonus}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="equity" className="text-gray-700 font-medium">
                    Equity (e.g., 10,000 RSUs){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="equity"
                    name="equity"
                    value={data.equity}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    type="number"
                    className={`h-12 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white transition-all ${
                      errors.equity
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-[#00C8B3]"
                    }`}
                  />
                  {errors.equity && (
                    <p className="text-red-500 text-xs">{errors.equity}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="yearsOfExperience"
                    className="text-gray-700 font-medium"
                  >
                    Years of Experience <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={data.yearsOfExperience}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    type="number"
                    className={`h-12 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white transition-all ${
                      errors.yearsOfExperience
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-[#005DAA]"
                    }`}
                  />
                  {errors.yearsOfExperience && (
                    <p className="text-red-500 text-xs">
                      {errors.yearsOfExperience}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-gray-900 font-semibold transition-colors cursor-pointer"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-linear-to-r from-[#005DAA] to-[#00C8B3] text-white h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200 cursor-pointer"
                  >
                    Submit Contribution
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
