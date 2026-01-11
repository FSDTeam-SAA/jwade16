import DashboardHeader from "@/components/website/PageSections/shared/DashboardHeader";
import Sidebar from "@/components/website/PageSections/shared/Sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard Template",
  description:
    "A modern dashboard template built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen relative bg-[#FCFBF8]">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <Sidebar className="hidden lg:flex fixed" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full lg:ml-64 transition-all duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 ">
          <DashboardHeader />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
