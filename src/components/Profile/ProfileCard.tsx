"use client";

import { UserContext } from "@/app/UserContext";
import useRedirect from "@/hooks/useRedirect";
import Image from "next/image";
import { useContext } from "react";
import { FaCamera } from "react-icons/fa";
export default function ProfileCard() {
    const redirect = useRedirect()
    const config = useContext(UserContext)
    return (
        <div className="w-full">
            <div className="flex animate-popover-show flex-col items-center space-y-4 p-6">
                <div className="h-24 w-24 flex items-center justify-center relative">
                    <Image
                    src={config?.user && config.user.image ? `${config.user.image}` : "/user.png"} className="h-24 w-24 flex-shrink-0 rounded-full"
                    width={60}
                    height={60}
                    alt="Avatar"
                />
                <button style={{borderRadius:"99999px"}} className="rounded-full right-2 bottom-[-3px] hover:bg-foreground hover:text-background bg-background w-7 h-7 absolute flex items-center justify-center border-2 border-foreground p-1.2"><FaCamera/></button>
                </div>
                <div className="space-y-1 text-center">
                    <h3 className="text-lg font-semibold">{config?.user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{config?.user?.email}</p>
                </div>
            </div>
        </div>
    )
}