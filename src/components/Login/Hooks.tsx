"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginInterface } from "@/interfaces/auth";
import { signIn } from "next-auth/react";
import { toast } from "sonner"

export default function useLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [callbackUrl, setCallbackUrl] = useState("/");
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const callback = urlParams.get('callbackUrl') || '/';
        setCallbackUrl(callback);
      }, []);
    const handleSubmit = async (values: LoginInterface) => {
        try {
            const id = toast.loading("Loading",{
                dismissible:true
            })
            const result = await signIn('credentials', {
                redirect: true,
                email: values.email,
                password: values.password,
                callbackUrl:""
            });
            if (result?.error) {
                console.error(result.error);
            } else {
                console.log("Successfully logged in", result);
                toast.success("Login Success",{
                    id
                })
            }
        } catch (error) {

        }
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('Required')
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        }),
        onSubmit: handleSubmit
    });
    return { formik, showPassword, setShowPassword }
}