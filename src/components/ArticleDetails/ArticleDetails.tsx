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
        <div className="w-full">
            <div className="w-full bg-background flex-col">
                <div className="w-full text-foreground font-heading flex items-center justify-center text text-2xl">
                    <h1 className="font-semibold">{article?.title}</h1>
                </div>
                {article?.thumbnail && (
                    <div className="w-full">
                        <img src={article.thumbnail as string} className="rounded-md max-w-md" alt="Article Thumbnail" />
                    </div>
                )}
                <div className="flex bg-background border-2 border-separate shadow-lg w-full flex-col flex-shrink-0">
                    <div className="w-full flex items-center justify-center">
                        {Array.isArray(article?.content) && article.content.map((content, index) => (
                            <div key={index} className="mb-2 border p-2 flex flex-col items-center justify-center rounded-md bg-gray-100">
                                <p className="flex justify-start w-full"><strong>{content.data}:</strong></p>
                                <div className="bg-gray-50 w-full justify-start p-2 rounded-md">
                                    {content.data === "image" ? (
                                        <img src={URL.createObjectURL(content.value as File)} alt={`Content ${index}`} className="max-w-full h-auto" />
                                    ) : content.data === "video" ? (
                                        <video controls className="max-w-full h-auto">
                                            <source src={URL.createObjectURL(content.value as File)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <pre className="whitespace-pre-wrap">{content.value as string}</pre>
                                    )}
                                </div>
                                {/* Edit and Remove Buttons */}
                                <div className="flex mt-2 space-x-2">
                                    {editIndex === index ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    // Assuming updateContent and setEditIndex are defined somewhere
                                                    // updateContent(index, newContent);
                                                    setEditIndex(null);
                                                }}
                                                className="text-green-500 hover:underline"
                                            >
                                                <FaSave className="inline mr-1" /> Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditIndex(null)}
                                                className="text-gray-500 hover:underline"
                                            >
                                                <FaTimes className="inline mr-1" /> Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setEditIndex(index)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
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
