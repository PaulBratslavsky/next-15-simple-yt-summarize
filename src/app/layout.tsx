import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { TopNavigation } from "@/components/global/top-navigation";
import { Toaster } from "@/components/ui/sonner";

import { AuthButton } from "@/components/global/auth/sign-in";
// import localFont from "next/font/local";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "min-h-screen")}>
        <SessionProvider>
          <TopNavigation authButton={<AuthButton />}>{children}</TopNavigation>
        </SessionProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}