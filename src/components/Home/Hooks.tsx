"use client";
import { Article } from "@/interfaces/articles";
import { getMyArticles } from "@/request/articles";
import { useEffect, useState } from "react";

export default function useHome() {
    const [state, setState] = useState<Article | null>(null);
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
    return { state, setState, articles, count }
}

export function useArticler(article: Article) {
    const [articler, setArticle] = useState(article)
    useEffect(()=>{
        setArticle(article)
    },[article])
    return { articler }
}