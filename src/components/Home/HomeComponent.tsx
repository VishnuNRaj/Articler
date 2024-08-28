"use client";

import useLoading from "@/hooks/useLoading";
// import { Dialog } from "@material-tailwind/react";
import EditArticleComponent from "../EditArticle/EditArticleComponent";
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
            <MyArticles articles={articles} />
        </div>
    )
}