import axiosInstance from "@/config/axios";
import { Article, getArticles } from "@/interfaces/articles";

export async function getMyArticles(data:getArticles):Promise<{count:number;articles:Article[]}> {
    try {
        const response = await axiosInstance.get(`/articles/find/me/${data.skip}?search=${data.search || ""}`,);
        console.log('Registration successful:', response.data);
        return response.data
    } catch (error:any) {
        console.error('Registration error:', error);
        return error.response.data
    }
}

export async function getArticleDatas(data:getArticles):Promise<{count:number;articles:Article[]}> {
    try {
        const response = await axiosInstance.get(`/articles/find/${data.skip}?search=${data.search || ""}`,);
        console.log('Registration successful:', response.data);
        return response.data
    } catch (error:any) {
        console.error('Registration error:', error);
        return error.response.data
    }
}