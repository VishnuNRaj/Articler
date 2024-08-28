"use client";

// import { Dialog } from "@material-tailwind/react";
import EditArticleComponent from "../EditArticle/EditArticleComponent";
import useHome from "./Hooks";
import MyArticles from "./MyArticles";

export default function HomeComponent() {
    const { setState, state, articles } = useHome()
    return (
        <div className="w-full">
            <MyArticles articles={articles} />
        </div>
    )
}