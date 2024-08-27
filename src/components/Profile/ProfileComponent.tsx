"use client";
import { UserContext } from "@/app/UserContext";
import { Card, CardContent } from "@/components/ui/card"
import useRedirect from "@/hooks/useRedirect";
import Image from "next/image";
import { useContext } from "react";
import ProfileCard from "./ProfileCard";

export default function ProfileComponent() {
  const redirect = useRedirect()
  const config = useContext(UserContext)
  return (
    <div className="flex min-h-screen items-center justify-center p-5 bg-auto text-gray-900">
      <div className="w-full animate-popover-show max-w-md border-separate border-background border-2 text-gray-900 rounded-lg shadow-lg p-6 px-6">
        {config?.user && <ProfileCard />}
      </div>
    </div>
  )
}