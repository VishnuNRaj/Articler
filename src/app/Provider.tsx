"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ColorModeProvider } from "../context/ThemeContext"; // Example context
import { SidebarDemo } from "@/components/Sidebar";
import { UserProvider } from "@/app/UserContext"
type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ColorModeProvider>
        <UserProvider>
          <SidebarDemo>
            {children}
          </SidebarDemo>
        </UserProvider>
      </ColorModeProvider>
    </SessionProvider>
  );
}
