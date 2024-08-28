"use client";

import useLoading from "@/hooks/useLoading";
import MyArticles from "../Home/MyArticles";
import useArticles from "./Hooks";
import Preloader from "@/styles/Preloader";

export default function ArticleComponent() {
    const { articles, count } = useArticles()
    const {loading} = useLoading() 
    if(loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Preloader/>
            </div>
        )
    }
    return (
        <div className="w-full p-2">
            {articles && articles.length > 0 && (
                <MyArticles articles={articles} />
            )}
        </div>
    )
}