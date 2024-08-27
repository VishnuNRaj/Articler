"use client";

import React, { useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import useArticleForm from "./Hooks"; 
import Preloader from "@/styles/Preloader";
import { Article, Content } from "@/interfaces/articles";
import useLoading from "@/hooks/useLoading";

interface Props {
    data: Article;
}

export default function EditArticleComponent({ data }: Props) {
    const {
        article,
        newContent,
        handleContentChange,
        handleFileChange,
        saveContent,
        removeContent,
        editContent,
        handleSubmit,
        setArticle,
        setNewContent,
        editIndex
    } = useArticleForm();

    const { loading } = useLoading();

    useEffect(() => {
        if (data) {
            setArticle(data);
        }
    }, [data]);

    return (
        <div className="flex min-h-screen items-center justify-center p-0 md:p-5 lg:-10 bg-auto text-gray-900">
            <div className="w-full max-w-2xl animate-popover-show border-separate border-popover border-2 text-gray-900 bg-muted rounded-lg shadow-lg p-8 px-6">
                <h2 className="text-2xl font-bold text-center mb-2">Edit Article</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={article.title}
                            onChange={(e) => setArticle({ ...article, title: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contentType" className="block text-gray-700 mb-1">
                            Content Type
                        </label>
                        <select
                            id="contentType"
                            value={newContent.data}
                            onChange={(e) => setNewContent({ ...newContent, data: e.target.value as Content["data"] })}
                            className="w-full px-3 py-3 border rounded-md appearance-none border-gray-300 bg-background"
                        >
                            <option value="text">Text</option>
                            <option value="code">Code</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contentValue" className="block text-gray-700 mb-1">
                            Content
                        </label>
                        {newContent.data === "text" || newContent.data === "code" ? (
                            <textarea
                                id="contentValue"
                                value={newContent.value as string}
                                onChange={handleContentChange}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && (newContent.data === "text" || newContent.data === "code")) {
                                        e.preventDefault();
                                        setNewContent({ ...newContent, value: newContent.value + "\n" });
                                    }
                                }}
                                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
                                rows={5}
                            />
                        ) : (
                            <input
                                id="contentFile"
                                type="file"
                                accept={newContent.data === "image" ? "image/*" : "video/*"}
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
                                required
                            />
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={saveContent}
                        className="mb-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
                    >
                        <FaPlus className="mr-2" /> {editIndex !== null ? "Update Content" : "Add Content"}
                    </button>

                    {article.content.map((content, index) => (
                        <div key={index} className="mb-2 border p-2 flex flex-col items-center justify-center rounded-md bg-gray-100">
                            <p className="flex justify-start w-full"><strong>{content.data}:</strong></p>
                            <div className="bg-gray-50 w-full justify-start p-2 rounded-md">
                                {content.data === "image" ? (
                                    <img src={content.value as string} alt={`Content ${index}`} className="max-w-full h-auto" />
                                ) : content.data === "video" ? (
                                    <video controls className="max-w-full h-auto">
                                        <source src={content.value as string} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <pre className="whitespace-pre-wrap">{content.value as string}</pre>
                                )}
                            </div>
                            <div className="flex mt-2">
                                <button
                                    type="button"
                                    onClick={() => editContent(index)}
                                    className="text-blue-500 hover:underline mr-2"
                                >
                                    <FaEdit className="inline mr-1" /> Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeContent(index)}
                                    className="text-red-500 hover:underline"
                                >
                                    <FaTrash className="inline mr-1" /> Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mb-4">
                        <label htmlFor="published" className="flex items-center text-gray-700">
                            <input
                                id="published"
                                type="checkbox"
                                checked={article.published}
                                onChange={(e) => setArticle({ ...article, published: e.target.checked })}
                                className="mr-2"
                            />
                            Published
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-ring text-background rounded-lg hover:bg-blue-600"
                    >
                        {loading ? <Preloader /> : "Submit Article"}
                    </button>
                </form>
            </div>
        </div>
    );
}
