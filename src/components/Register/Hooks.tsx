"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RegisterInterface } from "@/interfaces/auth";
import { registerUser } from "@/request/auth";
export default function useRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleSubmit = async (values: RegisterInterface) => {
        const response = await registerUser({ ...values, auth_type: "credential" })
        console.log(response)
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('Required')
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), ""], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: handleSubmit
    });

    return { formik, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }
}