"use client";
import { Article } from "@/interfaces/articles";
import { getArticle } from "@/request/articles";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useArticle() {
    const { link } = useParams()
    const [article, setArticle] = useState<Article | null>(null)
    async function getArticleData() {
        const response = await getArticle(link as string)
        if (response.article) {
            setArticle(response.article)
        }
    }
    useEffect(() => {
        if (link) {
            getArticleData()
        }
    }, [link])
    return { article }
}