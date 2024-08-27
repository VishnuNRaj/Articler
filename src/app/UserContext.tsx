"use client"
import useRedirect from '@/hooks/useRedirect';
import { getServerSession, User } from 'next-auth';
import { getSession } from 'next-auth/react';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';


interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const redirect = useRedirect()
    const getSessions = async () => {
        const session = await getSession()
        if (session?.user) {
            return setUser(session.user)
        } 
    }
    useEffect(() => {
        getSessions()
    }, [getServerSession])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return { ...context };
};
