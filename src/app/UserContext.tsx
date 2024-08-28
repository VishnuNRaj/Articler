"use client";
import { getSession } from "next-auth/react";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

interface UserContextType {
    user: Session["user"] | null;
    setUser: React.Dispatch<React.SetStateAction<Session["user"] | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Session["user"] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getSessionAndUpdate = async () => {
            const session = await getSession();
            if (session?.user) {
                setUser(session.user);
            } else {
                setUser(null);
                router.push("/login");
            }
        };

        getSessionAndUpdate();

        const handleSessionChange = async () => {
            const session = await getSession();
            if (session?.user) {
                setUser(session.user);
            }
        };

        window.addEventListener("focus", handleSessionChange);
        return () => window.removeEventListener("focus", handleSessionChange);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return { ...context };
};
