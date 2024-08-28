"use client";

import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import useArticleForm from "./Hooks"; 
import Preloader from "@/styles/Preloader";
import { Article, Content } from "@/interfaces/articles";
import useLoading from "@/hooks/useLoading";
import { toast } from "sonner";

interface Props {
    data: Article;
    complete:(article:Article)=>void;
}

export default function EditArticleComponent({ data,complete }: Props) {
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
        handleThumbnailChange,
        contentRef,
        thumbnailRef
    } = useArticleForm(complete);

    const { loading } = useLoading();
    const [editIndex, setEditIndex] = useState<number | null>(null);

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
                    {/* Title Input */}
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
                    
                    {/* Content Type */}
                    <div className="mb-4">
                        <label htmlFor="content_type" className="block text-gray-700 mb-1">
                            Content Type
                        </label>
                        <input
                            id="content_type"
                            name="content_type"
                            type="text"
                            value={article.content_type}
                            onChange={(e) => setArticle({ ...article, content_type: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
                            required
                        />
                    </div>

                    {/* Thumbnail */}
                    <div className="mb-4">
                        <label htmlFor="thumbnail" className="block text-gray-700 mb-1">
                            Thumbnail
                        </label>
                        <div onClick={() => thumbnailRef?.current?.click()} className="w-full px-3 py-2 border rounded-md flex-col gap-2 border-background bg-border hover:bg-background shadow-lg border-separate h-[250px] flex items-center justify-center">
                            <input
                                id="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
                                hidden
                                ref={thumbnailRef}
                            />
                            {article.thumbnail ? (
                                <>
                                    <img src={typeof article.thumbnail === "string" ? article.thumbnail : URL.createObjectURL(article.thumbnail as File)} alt={``} className="w-auto h-[200px] rounded-md" />
                                    <button type="button" className="bg-foreground text-background p-1 px-3 rounded-md">Change</button>
                                </>
                            ) : (
                                <>
                                    <FaPlus />
                                    <h1>Add Thumbnail</h1>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Description Input */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={article.description}
                            onChange={(e) => setArticle({ ...article, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
                            rows={4}
                        />
                    </div>

                    {/* Content Type Selection */}
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

                    {/* Content Value Input */}
                    <div className="mb-4">
                        <label htmlFor="contentValue" className="block text-gray-700 mb-1">
                            Content
                        </label>
                        {newContent.data === "text" || newContent.data === "code" ? (
                            <textarea
                                id="contentValue"
                                value={newContent.value as string}
                                onChange={handleContentChange}
                                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 resize-none"
                                rows={5}
                            />
                        ) : (
                            <div onClick={() => contentRef?.current?.click()} className="w-full px-3 py-2 border rounded-md flex-col gap-4 border-background bg-border hover:bg-background shadow-lg border-separate h-[220px] flex items-center justify-center">
                                <input
                                    id="contentFile"
                                    type="file"
                                    accept={newContent.data === "image" ? "image/*" : "video/*"}
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border rounded-md border-gray-300"
                                    hidden
                                    ref={contentRef}
                                />
                                {newContent.value ? (
                                    <>
                                        {newContent.data === "image" ? (
                                            <img src={typeof newContent.value === "string" ? newContent.value : URL.createObjectURL(newContent.value as File)} alt={``} className="w-auto h-[200px] rounded-md" />
                                        ) : (
                                            <video controls className="w-auto h-[200px] rounded-md">
                                                <source src={URL.createObjectURL(newContent.value as File)} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <FaPlus />
                                        <h1>Upload file here</h1>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Add Content Button */}
                    <button
                        type="button"
                        onClick={() => {
                            if (!newContent.value) {
                                return toast.error(`Add Something`)
                            } else saveContent();
                        }}
                        className="mb-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
                    >
                        <FaPlus className="mr-2" /> {editIndex !== null ? "Update Content" : "Add Content"}
                    </button>

                    {/* Display Added Content */}
                    {article.content.map((content, index) => (
                        <div key={index} className="mb-2 border p-2 flex flex-col items-center justify-center rounded-md bg-gray-100">
                            <p className="flex justify-start w-full"><strong>{content.data}:</strong></p>
                            <div className="bg-gray-50 w-full justify-start p-2 rounded-md">
                                {content.data === "image" ? (
                                    <img src={typeof content.value === "string" ? content.value : URL.createObjectURL(content.value as File)} alt={`Content ${index}`} className="max-w-full h-auto" />
                                ) : content.data === "video" ? (
                                    <video controls className="max-w-full h-auto">
                                        <source src={typeof content.value === "string" ? content.value : URL.createObjectURL(content.value as File)} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <pre className="whitespace-pre-wrap">{content.value as string}</pre>
                                )}
                            </div>

                            {/* Edit and Remove Buttons */}
                            <div className="flex mt-2 space-x-2">
                                <button
                                    type="button"
                                    onClick={() => editContent(index)}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeContent(index)}
                                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-foreground text-background flex items-center justify-center gap-3 rounded-lg"
                    >
                        {!loading && <><FaSave className="" /> Save Changes</>}
                        {loading && <Preloader/>}
                    </button>
                </form>
            </div>
        </div>
    );
}
