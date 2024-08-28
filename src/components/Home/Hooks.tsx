"use client";
import { Article } from "@/interfaces/articles";
import { getMyArticles } from "@/request/articles";
import { useEffect, useState } from "react";

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
    useEffect(()=>{
        setArts(article)
    },[])
    return {state,setState,arts,editComplete}
}