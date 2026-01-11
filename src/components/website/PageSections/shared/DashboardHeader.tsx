"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardHeader() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { data: session } = useSession();

  // loading check removed for brevity if not needed for layout logic, or kept

  const handleLogout = () => {
    signOut();
    setLogoutDialogOpen(false);
  };

  // ...

  return (
    <header className="w-full h-[100px] bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
      {/* Left: Logo + Sidebar Toggle */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar (Sheet) */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar className="w-full h-full border-none" />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Admin... </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 px-3 cursor-pointer"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  // src={session?.user?.image?.url || "/images/profile-mini.jpg"}
                  alt="Admin"
                />
                <AvatarFallback>
                  {session?.user?.firstName?.charAt(0)}
                  {session?.user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="text-left">
                <p className="text-sm font-medium">
                  {session?.user?.firstName} {session?.user?.lastName}
                </p>
                <p className="text-xs text-gray-600">{session?.user?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {/* <Link href="/profile">
              <DropdownMenuItem>
                <User2Icon /> Profile
              </DropdownMenuItem>
            </Link>

            <Link href="/profile/changePassword">
              <DropdownMenuItem>
                <KeyIcon /> Change Password
              </DropdownMenuItem>
            </Link> */}

            <DropdownMenuItem
              className="text-[#e5102e] hover:bg-[#feecee] cursor-pointer"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <LogOut /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogTrigger asChild>
          <button style={{ display: "none" }}></button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
