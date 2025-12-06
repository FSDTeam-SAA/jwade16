import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Pay Power Score",
  description: "Pay Power Score",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}
