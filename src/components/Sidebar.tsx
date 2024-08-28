"use client";

import React, { useContext, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./Canvas";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
    IconPlus
} from "@tabler/icons-react";
import Link from "next/link";
// tsignore
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useLogout from "@/hooks/useLogout";
import useRedirect from "@/hooks/useRedirect";
import { UserContext, useUser } from "@/app/UserContext";
import { FaBook } from "react-icons/fa";

interface SidebarDemoProps {
    children: React.ReactNode;
}

export function SidebarDemo({ children }: SidebarDemoProps) {
    const Logout = useLogout()
    const redirect = useRedirect()
    const config = useContext(UserContext)
    console.log(config)
    const links = [
        {
            label: "Dashboard",
            href: "/",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            onclick: () => redirect({ path: "/" })
        },
        {
            label: "Articles",
            href: "/articles",
            icon: (
                <FaBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            onclick: () => redirect({ path: "/articles" })
        },
        {
            label: "Add Article",
            href: "/add-article",
            icon: (
                <IconPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            onclick: () => redirect({ path: "/add-article" })
        },
        {
            label: "Profile",
            href: "/profile",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            onclick: () => redirect({ path: "/profile" })
        },
        {
            label: "Settings",
            href: "/settings",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            onclick: () => redirect({ path: "/settings" })
        },
        {
            label: `${config && config.user ? "Logout" : "Login"}`,
            href: `${config && config.user ? "/login" : "/login"}`,
            onclick: config && config.user ? Logout : () => { },
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-secondary dark:bg-muted w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 border-r-2 shadow-lg bg-popover border-separate">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    {config && config.user ? <SidebarLink
                        link={{
                            label: `${config.user?.name}`,
                            href: "/profile",
                            onclick: () => redirect({ path: "/profile" }),
                            icon: (
                                <img
                                    src={config?.user && config.user.image ? `${config.user.image}` : "/user.png"} className="h-7 w-7 flex-shrink-0 object-cover rounded-full"
                                    style={{borderRadius:"99999px"}}
                                    alt="Avatar"
                                />
                            ),
                        }}
                    /> : <SidebarLink
                        link={{
                            label: "Login",
                            href: "/login",
                            onclick: () => redirect({ path: "/login" }),
                            icon: (
                                <Image
                                    src={config?.user && config.user.image ? `${config.user.image}` : "/user.png"}
                                    className="h-7 w-7 flex-shrink-0 rounded-full"
                                    width={50}
                                    height={50}
                                    style={{borderRadius:"99999px"}}
                                    alt="Avatar"
                                />
                            ),
                        }}
                    />}
                </SidebarBody>
            </Sidebar>

            <main className="flex-1 p-4 overflow-y-scroll">
                {children}
            </main>
        </div>
    );
}

export const Logo = () => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium flex justify-between gap-5 text-black dark:text-white whitespace-pre"
            >
                <img src="/Desktop.png" className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
                Articler
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <img src="/Desktop.png" className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};
