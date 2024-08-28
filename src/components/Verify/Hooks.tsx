"use client";

import useRedirect from '@/hooks/useRedirect';
import { verifyUser } from '@/request/auth';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useLoading from '@/hooks/useLoading';

export default function useVerify() {
    const { verification_link } = useParams()
    const [verify,setVerify] = useState({
        message:"Verifying Please Wait",
        verified:false,
        complete:false,
    })
    const {loading,setLoading} = useLoading()
    const redirect = useRedirect()
    const handleSubmit = async () => {
        const id = toast.loading("Loading", {
            dismissible: true
        })
        try {
            const response = await verifyUser(verification_link as string)
            console.log(response)
            if (response.status === 200) {
                toast.success("Verified Successfully",{
                    id
                })
                setVerify({
                    message:"Account Verified Successfully",
                    verified:true,
                    complete:true,
                })
            } else {
                toast.error(response.error,{
                    id,
                });
                setVerify({
                    message:response.error,
                    verified:false,
                    complete:true
                })
            }
        } catch (e) {
            console.log(e)
            setVerify({
                message:"Internal Server Error",
                verified:false,
                complete:true,
            })
            return toast.error("",{
                id
            })
        } 
        setLoading(false)
    }
    useEffect(() => {
        handleSubmit()
    }, []);

    return {verify,loading};
}
