"use client";
import { Article } from "@/interfaces/articles";
import { deleteArticle, getMyArticles } from "@/request/articles";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useHome() {
    const [articles, setArticles] = useState<Article[]>([])
    const [skip, setSkip] = useState(0)
    const [count, setCount] = useState(0)
    async function getArticles() {
        try {
            const response = await getMyArticles({ skip, search: "" })
            setArticles(response.articles)
            setCount(response.count)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getArticles()
    }, [])
    return { articles, count }
}

export function useArticler(article: Article) {
    const [articler, setArticle] = useState(article)
    useEffect(()=>{
        setArticle(article)
    },[article])
    return { articler }
}

export function useMapArticle(article:Article[]) {
    const [state, setState] = useState<Article | null>(null);
    const [arts,setArts] = useState<Article[]>([])
    async function editComplete(newData:Article) {
        const update = arts.map((alue,udx)=>{
            if(newData.id === state?.id) {
                return newData;
            } else return alue;
        })
        setArts(update)
    }
    async function deleteArt(link:string) {
        toast.loading("Removing article please wait",{id:link})
        const response = await deleteArticle(link)
        if(response.status === 200) {
            const updated = arts.filter((val)=>val.link !== link)
            setArts(updated)
            return toast.success(response.message,{id:link})
        } else return toast.error(response.message,{id:link})

    }
    useEffect(()=>{
        setArts(article)
    },[])
    return {state,setState,arts,editComplete,deleteArt}
}