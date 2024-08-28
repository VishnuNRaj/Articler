import { useState } from "react";
import { Add_Article, Article, Content } from "@/interfaces/articles";
import useRedirect from "@/hooks/useRedirect";
import useLoading from "@/hooks/useLoading";
import axiosInstance from "@/config/axios";
import { toast } from "sonner";
import { uploadFile } from "@/utils/FilesUpload";

function useArticleForm() {
    const [article, setArticle] = useState<Article>({
        id: "",
        title: "",
        content: [],
        published: false,
        createdAt: new Date(),
        content_type:"",
        description:"",
        link:"",
        thumbnail:"",
    });

    const [newContent, setNewContent] = useState<Content>({ data: "text", value: "" });
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const redirect = useRedirect();

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNewContent({ ...newContent, value: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewContent({ ...newContent, value: e.target.files[0] });
        }
    };

    const saveContent = () => {
        if (editIndex !== null) {
            const updatedContent = [...article.content];
            updatedContent[editIndex] = newContent;
            setArticle({ ...article, content: updatedContent });
            setEditIndex(null);
        } else {
            setArticle({
                ...article,
                content: [...article.content, newContent],
            });
        }
        setNewContent({ data: "text", value: "" });
    };

    const removeContent = (index: number) => {
        const updatedContent = article.content.filter((_, i) => i !== index);
        setArticle({ ...article, content: updatedContent });
    };

    const editContent = (index: number) => {
        setNewContent(article.content[index]);
        setEditIndex(index);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const id = toast.loading("Uploading please wait", {
                dismissible: true,
            });

            const resolvedContent = await Promise.all(
                article.content.map(async (content) => {
                    if (content.data === "image" || content.data === "video") {
                        if (typeof content.value !== "string") {
                            const url = await uploadFile(content.value as File);
                            return { ...content, value: url || "" };
                        }
                    }
                    return content;
                })
            );

            const data = {
                title: article.title,
                published: article.published,
                content: resolvedContent,
                id: article.id,
            };

            const response = await axiosInstance.post("/articles/edit", data);

            if (response.status === 200) {
                toast.success("Uploaded Successfully", {
                    id,
                });
                return redirect({ path: "/articles" });
            } else {
                console.error("Failed to submit the article.");
            }
        } catch (error) {
            console.error("An error occurred while submitting the article.", error);
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
        editIndex
    };
}

export default useArticleForm;
