import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { SidebarDemo } from "@/components/Sidebar";
import { Toaster } from "sonner";
import Providers from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Articler",
  description: "Articles...",
  icons:"/Desktop.png"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full m-0 p-0">
          <Toaster duration={1500} closeButton position="bottom-right" />
          {/* <SidebarDemo> */}
          <Providers>
            {children}
          </Providers>
          {/* </SidebarDemo> */}
        </div>
      </body>
    </html>
  );
}
