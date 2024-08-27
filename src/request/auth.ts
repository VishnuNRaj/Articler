import axiosInstance from '@/config/axios';
import { RegisterInterface, RegitserResponse } from '@/interfaces/auth';
import { AxiosResponse } from 'axios';
import { getServerSession, Session } from 'next-auth';

export async function registerUser(userData:RegisterInterface):Promise<AxiosResponse<RegitserResponse>> {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        console.log('Registration successful:', response.data);
        return response.data
    } catch (error:any) {
        console.error('Registration error:', error);
        return error.response.data 
    }
}

export async function verifyUser(link:string):Promise<RegitserResponse> {
    try {
        const response = await axiosInstance.get(`/auth/verify/${link}`,);
        console.log('Registration successful:', response.data);
        return response.data
    } catch (error:any) {
        console.error('Registration error:', error);
        return error.response.data
    }
}

export async function getSession(link:string):Promise<any | null> {
    try {
        const response = await getServerSession()
        return response && response.user ? response.user : null
    } catch (error:any) {
        console.error('Registration error:', error);
        return null
    }
}

