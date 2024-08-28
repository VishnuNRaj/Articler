"use client";

import { UserContext } from "@/app/UserContext";
import useRedirect from "@/hooks/useRedirect";
import Image from "next/image";
import { useContext } from "react";
import { FaCamera } from "react-icons/fa";
import useProfileEdit from "./Hooks";
import Preloader from "@/styles/Preloader";
export default function ProfileCard() {
    const redirect = useRedirect()
    const config = useContext(UserContext)
    const { handleChange, image, loading, imageRef } = useProfileEdit()
    return (
        <div className="w-full">
            <div className="flex animate-popover-show flex-col items-center space-y-4 p-6">
                <div style={{borderRadius:"9999px"}} className="h-28 w-28 flex items-center justify-center relative border-2 shadow-lg bg-popover border-foreground ">
                    <input type="file" accept="image/*" hidden onChange={(e)=>e.target.files && e.target.files.length > 0 && e.target.files[0].type.startsWith("image/") && handleChange(e.target.files[0])} ref={imageRef} />
                    {loading ? <Preloader /> : !image ? (
                        <img
                            src={config?.user && config.user.image ? `${config.user.image}` : "/user.png"} className="h-24 w-24 object-cover shadow-lg shadow-foreground flex-shrink-0 rounded-full"
                            width={60}
                            height={60}
                            alt="Avatar"
                            style={{borderRadius:"9999px"}}
                        />
                    ) : <Image
                        src={URL.createObjectURL(image)} className="h-24 w-24 flex-shrink-0 object-cover rounded-full shadow-lg"
                        width={60}
                        height={60}
                        alt="Avatar"
                        style={{borderRadius:"9999px"}}
                    />}
                    <button style={{ borderRadius: "99999px" }} onClick={()=>imageRef?.current?.click()} className="rounded-full right-2 bottom-[-3px] hover:bg-foreground hover:text-background bg-background w-7 h-7 absolute flex items-center justify-center border-2 border-foreground p-1.2"><FaCamera /></button>
                </div>
                <div className="space-y-1 text-center">
                    <h3 className="text-lg font-semibold">{config?.user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{config?.user?.email}</p>
                </div>
            </div>
        </div>
    )
}