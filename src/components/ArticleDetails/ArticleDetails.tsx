"use client"
import useLoading from "@/hooks/useLoading";
import useArticle from "./Hooks";
import Preloader from "@/styles/Preloader";
import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

export default function ArticleDetails() {
    const { article } = useArticle();
    const { loading } = useLoading();
    const [editIndex, setEditIndex] = useState<number | null>(null);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Preloader />
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full flex gap-2 py-5 px-4  rounded-md shadow-xl shadow-foreground bg-background flex-col">
                <div className="w-full gap-2 text-foreground font-heading flex items-center justify-center text text-[30px]">
                    <h1 className="font-semibold">{article?.title}</h1>
                </div>
                {article?.thumbnail && (
                    <div className="w-full flex rounded-md items-center justify-center">
                        <img src={article.thumbnail as string} className="rounded-md w-full max-w-xl h-[300px]" alt="Article Thumbnail" />
                    </div>
                )}

                <div className="flex bg-background border-2 border-separate shadow-lg w-full flex-col flex-shrink-0">
                    <div className="w-full flex flex-col items-center justify-center p-2">
                        <div className="mb-2 w-full border p-2 flex flex-col items-center justify-center rounded-md bg-gray-100">
                            <div className="bg-gray-50 flex items-center flex-col justify-center w-full p-2 rounded-md">
                                <pre className="whitespace-pre-wrap flex justify-between w-full">{article?.description as string}</pre>
                                <span className="w-full font-semibold flex justify-end items-end">{"By "+article?.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex bg-background border-2 border-separate shadow-lg w-full flex-col flex-shrink-0">
                    <div className="w-full flex flex-col items-center justify-center p-2">
                        {Array.isArray(article?.content) && article.content.map((content, index) => (
                            <div key={index} className="mb-2 w-full border p-2 flex flex-col items-center justify-center rounded-md bg-gray-100">
                                <div className="bg-gray-50 flex items-center justify-center w-full p-2 rounded-md">
                                    {content.data === "image" ? (
                                        <img src={content.value as string} alt={`Content ${index}`} className="max-w-full rounded-md h-[300px]" />
                                    ) : content.data === "video" ? (
                                        <video controls className="w-auto rounded-md h-[300px]">
                                            <source className="" src={content.value as string} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <pre className="whitespace-pre-wrap">{content.value as string}</pre>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
