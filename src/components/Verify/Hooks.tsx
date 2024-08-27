"use client";

import useRedirect from '@/hooks/useRedirect';
import { verifyUser } from '@/request/auth';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useLogin from '../Login/Hooks';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

export default function useVerify() {
    const { verification_link } = useParams()
    const redirect = useRedirect()
    const handleSubmit = async () => {
        const id = toast.loading("Loading", {
            dismissible: true
        })
        try {
            const response = await verifyUser(verification_link as string)
            if (response.status === 200) {
                toast.success("Verified Successfully",{
                    id
                })
                return redirect({ path: "/" })
            } else return toast.error(response.message,{
                id
            });
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const verificationLink = searchParams.get('verification_link');

        alert(verification_link);
        handleSubmit()
    }, [verification_link]);

    return null;
}
