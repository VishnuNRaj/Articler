import axiosInstance from "@/config/axios";
import { useEffect, useState } from "react";

export default function useLoading() {
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        axiosInstance.interceptors.response.use((config) => {
            setLoading(false)
            return config;
        })
        axiosInstance.interceptors.request.use((config) => {
            setLoading(true)
            return config;
        })
    }, [])

    return { loading,setLoading }
}