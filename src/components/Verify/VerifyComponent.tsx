"use client";

import useLoading from "@/hooks/useLoading";
import useVerify from "./Hooks";
import Preloader from "@/styles/Preloader";
import Link from "next/link";

export default function VerifyComponent() {
    const { verify,loading } = useVerify()
    return (
        <div className="w-full p-2 flex justify-center">
            <div className="w-full gap-3 flex-col p-5 animate-accordion-up max-w-md bg-popover shadow-lg border-separate border-background border-2 flex items-center justify-center rounded-lg h-[200px]">
                <h1>{verify.message || "Verifying Please Wait"}</h1>
                <Link href={loading ? "#" : !loading && verify.verified ? "/login" : "/register"} className="w-full p-3 text-background bg-foreground rounded-md flex items-center justify-center">
                    {loading && !verify.complete && <Preloader/>}
                    {!loading && verify.verified && <>Go to Login Page</>}
                    {!loading && !verify.verified && <>Create a new account</>}
                </Link>
            </div>
        </div>
    )
}