import { useState, useRef, ChangeEvent } from "react";
import { Article, Content } from "@/interfaces/articles";
import { toast } from "sonner";
import axiosInstance from "@/config/axios";
import { uploadFile } from "@/utils/FilesUpload";
import { redirect } from "next/dist/server/api-utils";
import useRedirect from "@/hooks/useRedirect";

const useArticleForm = (complete:(article:Article)=>void) => {
    const [article, setArticle] = useState<Article>({
        id: "",
        title: "",
        description: "",
        thumbnail: null,
        published: false,
        content: [],
        content_type: "",
        created_at:new Date(),
        link:""
    });
    const redirect = useRedirect()
    const [edit,setEdit] = useState<number | null>(null)
    const [newContent, setNewContent] = useState<Content>({
        data: "text",
        value: "",
    });

    const contentRef = useRef<HTMLInputElement>(null);
    const thumbnailRef = useRef<HTMLInputElement>(null);

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent({ ...newContent, value: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewContent({ ...newContent, value: file });
        }
    };

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setArticle({ ...article, thumbnail: file });
        }
    };

    const saveContent = () => {
        if(edit) {
            const update = article.content.map((value,idx)=>{
                if(idx === edit) {
                    return newContent;
                } else value;
            })
            setArticle((prev) => ({
                ...prev,
                content: update as Article["content"],
            }));
        }
        setArticle((prev) => ({
            ...prev,
            content: [...prev.content, newContent],
        }));
        setNewContent({ data: "text", value: "" });
    };

    const removeContent = (index: number) => {
        setArticle((prev) => ({
            ...prev,
            content: prev.content.filter((_, i) => i !== index),
        }));
    };

    const editContent = (index: number) => {
        const content = article.content[index];
        setNewContent(content);
        removeContent(index);
        setEdit(index)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const id = toast.loading("Uploading please wait", {
                dismissible: true,
            });
            const resolvedContent = await Promise.all(
                article.content.map(async (content) => {
                    if (content.data === "image" && typeof content.value !== "string"  || content.data === "video" && typeof content.value !== "string") {
                        const url = await uploadFile(content.value as File);
                        return { ...content, value: url || "" };
                    }
                    return content;
                })
            );

            let thumbnailUrl = "";
            if (typeof article.thumbnail !== "string") {
                thumbnailUrl = await uploadFile(article.thumbnail as File) as string;
            } else {
                thumbnailUrl = article.thumbnail
            }
    
            const data:Article = {
                title: article.title,
                published: article.published,
                description: article.description,
                thumbnail: thumbnailUrl,
                content: resolvedContent,
                content_type:article.content_type,
                id:article.id,
                created_at:article.created_at,
                link:article.link,
            };
    
            console.log(data);
            // await complete(data)
            const response = await axiosInstance.post("/articles/edit", data);
            console.log(response)
            if (response.status === 200) {
                toast.success("Article updated successfully",{
                    id,
                    // onAutoClose:()=>redirect({path:response.data.link})
                });
            } else {
                toast.error("Failed to update article",{
                    id
                });
            }
        } catch (error) {
            toast.error("An error occurred while updating the article");
        }
    };

    return {
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
    };
};

export default useArticleForm;
