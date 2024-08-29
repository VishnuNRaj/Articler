"use client";

import useLoading from "@/hooks/useLoading";
import useHome from "./Hooks";
import MyArticles from "./MyArticles";
import Preloader from "@/styles/Preloader";

export default function HomeComponent() {
    const { articles } = useHome()
    const {loading} = useLoading() 
    if(loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Preloader/>
            </div>
        )
    }
    return (
        <div className="w-full">
            <div className="w-full flex items-center justify-center flex-shrink-0">
                My Articles
            </div>
            {articles && articles.length > 0 && (
                <MyArticles articles={articles} />
            )}
        </div>
    )
}