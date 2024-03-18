import type { Metadata } from "next";
import { Inter as Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/Providers/modalProvider";
import primsadb from "@/lib/prismadb";
import {Toaster} from 'react-hot-toast'

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nitro | An Ai Powered Ecommerce",
  description: "A Great Ecommerce App Made With Great Modern Technologies",
  keywords: "ecommerce,nitroadmin,admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("", raleway.className)}>
          <ModalProvider />
          <Toaster />
          {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
