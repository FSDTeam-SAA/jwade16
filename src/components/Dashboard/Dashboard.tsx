"use client";
import React from "react";
import { useGetContribution } from "@/lib/hooks/useContribution";
import ContributionTable from "./ContributionTable";

export default function Dashboard() {
  const [page, setPage] = React.useState(1);
  const limit = 10;
  const { data, isLoading, error } = useGetContribution(page, limit);

  // console.log(data?.data);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading contributions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading contributions.
      </div>
    );
  }

  const contributions = data?.data?.data || [];
  const pagination = data?.data?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#005DAA] mb-8 font-primary">
        Contribution Management
      </h1>
      <div className=" mx-auto container">
        <ContributionTable
          data={contributions}
          pagination={pagination}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
