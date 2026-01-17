"use client";

import React, { useState } from "react";
import { Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteContribution } from "@/lib/hooks/useContribution";
import {
  PaginationData,
  ContributionPayload,
} from "@/lib/services/contributionService";
import { toast } from "sonner";

interface ContributionData extends ContributionPayload {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface ContributionTableProps {
  data: ContributionData[];
  pagination: PaginationData;
  onPageChange: (page: number) => void;
}

export default function ContributionTable({
  data,
  pagination,
  onPageChange,
}: ContributionTableProps) {
  const [selectedContribution, setSelectedContribution] =
    useState<ContributionData | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const deleteMutation = useDeleteContribution();

  const handleView = (contribution: ContributionData) => {
    setSelectedContribution(contribution);
    setIsViewOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
    if (!deleteMutation.isPending) {
      setIsViewOpen(false);
    }
    if(deleteMutation.isSuccess) {
      toast.success("Contribution deleted successfully.");
    }
    if(deleteMutation.isError) {
      console.log(deleteMutation.error);
      toast.error("Failed to delete contribution.");
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.companyName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.jobTitle}</td>
                  <td className="px-6 py-4 text-gray-600">{item.location}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleView(item)}
                        className="h-8 w-8 text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(item._id)}
                        className="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  No contributions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Simplified Pagination */}
      <div className="flex items-center justify-between px-2 py-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-900">{data.length}</span> of{" "}
          <span className="font-medium text-gray-900">{pagination.total}</span>{" "}
          records
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={!pagination.hasPrev}
              className="px-3 cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={!pagination.hasNext}
              className="px-3 cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* View Modal - Simplified */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-2xl text-[#005DAA]">
              Details
            </DialogTitle>
          </DialogHeader>

          {selectedContribution && (
            <div className="grid gap-4 py-4 text-sm ">
              <div className="grid grid-cols-2 border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Company Name</span>
                <span className="text-gray-900">
                  {selectedContribution.companyName}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Job Title</span>
                <span className="text-gray-900">
                  {selectedContribution.jobTitle}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Job Level</span>
                <span className="text-gray-900">
                  {selectedContribution.jobLevel || "N/A"}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Location</span>
                <span className="text-gray-900">
                  {selectedContribution.location}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Base Salary</span>
                <span className="text-gray-900 font-semibold text-blue-600">
                  ${selectedContribution.baseSalary.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Annual Bonus</span>
                <span className="text-gray-900">
                  ${selectedContribution.annualBonus.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Equity</span>
                <span className="text-gray-900">
                  {selectedContribution.equity}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Experience</span>
                <span className="text-gray-900">
                  {selectedContribution.yearsOfExperience} years
                </span>
              </div>
              <div className="pt-2 text-center text-[11px] text-gray-400">
                Created{" "}
                {new Date(selectedContribution.createdAt).toLocaleString()}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsViewOpen(false)} className="cursor-pointer">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
