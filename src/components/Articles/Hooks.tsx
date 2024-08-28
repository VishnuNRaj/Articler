"use client";
import { Article } from "@/interfaces/articles";
import { getArticleDatas } from "@/request/articles";
import { useEffect, useState } from "react";

export default function useArticles() {
    const [articles, setArticles] = useState<Article[]>([])
    const [skip, setSkip] = useState(0)
    const [count, setCount] = useState(0)
    async function getArticleData() {
        try {
            const response = await getArticleDatas({ skip, search: "" })
            setArticles(response.articles)
            setCount(response.count)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getArticleData()
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