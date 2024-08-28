"use client";

import MyArticles from "../Home/MyArticles";
import useArticles from "./Hooks";

export default function ArticleComponent() {
    const { articles, count } = useArticles()
    return (
        <div className="w-full p-2">
            <MyArticles articles={articles} />
        </div>
    )
}