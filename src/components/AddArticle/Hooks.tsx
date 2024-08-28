import { useRef, useState } from "react";
import { Add_Article, Content } from "@/interfaces/articles";
import useRedirect from "@/hooks/useRedirect";
import useLoading from "@/hooks/useLoading";
import axiosInstance from "@/config/axios";
import { toast } from "sonner";
import { uploadFile } from "@/utils/FilesUpload";

function useArticleForm() {
    const [article, setArticle] = useState<Add_Article>({
        title: "",
        content: [],
        published: false,
        description: "",
        thumbnail: null,
        content_type:""
    });
    const contentRef = useRef<HTMLInputElement | null>(null)
    const thumbnailRef = useRef<HTMLInputElement | null>(null)
    const [newContent, setNewContent] = useState<Content>({ data: "text", value: "" });
    const redirect = useRedirect();

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNewContent({ ...newContent, value: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewContent({ ...newContent, value: e.target.files[0] });
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setArticle({ ...article, thumbnail: e.target.files[0] });
        }
    };

    const addContent = () => {
        setArticle({
            ...article,
            content: [...article.content, newContent],
        });
        setNewContent({ data: "text", value: "" }); // Reset for new content
    };

    const removeContent = (index: number) => {
        const updatedContent = article.content.filter((_, i) => i !== index);
        setArticle({ ...article, content: updatedContent });
    };

    const updateContent = (index: number, content: Content) => {
        const updatedContent = [...article.content];
        updatedContent[index] = content;
        setArticle({ ...article, content: updatedContent });
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
                        const url = await uploadFile(content.value as File);
                        return { ...content, value: url || "" };
                    }
                    return content;
                })
            );

            let thumbnailUrl = "";
            if (article.thumbnail) {
                thumbnailUrl = await uploadFile(article.thumbnail as File) as string;
            }
    
            const data = {
                title: article.title,
                published: article.published,
                description: article.description,
                thumbnail: thumbnailUrl,
                content: resolvedContent,
                content_type:article.content_type
            };
    
            console.log(data);
    
            const response = await axiosInstance.post("/articles/add", data);
    
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
        handleThumbnailChange,
        addContent,
        removeContent,
        updateContent, 
        handleSubmit,
        setArticle,
        setNewContent,
        thumbnailRef,
        contentRef
    };
}

export default useArticleForm;
