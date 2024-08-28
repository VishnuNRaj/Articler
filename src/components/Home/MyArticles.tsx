"use client";

import { Article } from "@/interfaces/articles";
import { useArticler, useMapArticle } from "./Hooks";
import { FaEdit, FaTrash } from "react-icons/fa";
import useArticleForm from "../EditArticle/Hooks";
import { Dialog } from "@material-tailwind/react";
import EditArticleComponent from "../EditArticle/EditArticleComponent";
import { SetStateAction } from "react";
import useRedirect from "@/hooks/useRedirect";

export function Articler({ article, setState }: { article: Article, state: Article | null; setState: React.Dispatch<SetStateAction<Article | null>> }) {
    const { articler } = useArticler(article);
    const redirect = useRedirect()
    return (
        <div className="w-full p-4 shadow-lg bg-background h-auto flex-col hover:bg-foreground text-foreground hover:text-background flex items-center justify-between rounded-md">
            <div onClick={()=>redirect({path:`/articles/${article.link}`})} className="w-full flex items-center gap-4 justify-center">
                <h1 className="font-semibold">Title: {articler.title}</h1>
                <h1 className="font-semibold">Content: {articler.content_type}</h1>
            </div>
            {articler && (
                <div onClick={()=>redirect({path:`/articles/${article.link}`})} className="flex">
                    <div className="w-[20%] flex items-center justify-center flex-shrink-0" style={{ borderRadius: "9999px" }}>
                        <img style={{ borderRadius: "9999px" }} src={articler.thumbnail as string} className="w-28 aspect-square h-full object-cover" alt="Article Thumbnail" />
                    </div>
                    <div className="w-[80%] flex-shrink-0 px-2 flex gap-2 items-center justify-center flex-col">
                        <p className="line-clamp-5 overflow-hidden text-ellipsis">{articler.description}</p>
                    </div>
                </div>
            )}
            {window.location.pathname === "/" && (
                <div className="w-full max-w-full flex-shrink-0 p-2 gap-2 flex-row flex justify-between">
                    <button onClick={() => setState(articler)} className="rounded-md flex items-center justify-center flex-shrink-0 gap-2 shadow-lg p-2 px-3 bg-foreground hover:bg-background hover:text-foreground text-background">
                        <FaEdit /> Edit
                    </button>
                    <button className="rounded-md flex items-center justify-center flex-shrink-0 gap-2 shadow-lg p-2 px-3 bg-foreground hover:bg-background hover:text-foreground text-background">
                        <FaTrash /> Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default function MyArticles({ articles }: { articles: Article[] }) {
    const { setState, state,arts,editComplete } = useMapArticle(articles)
    return (
        <>
            {state && (
                <div className="w-full bg-foreground overflow-y-scroll flex items-center justify-center">
                    <Dialog size="xxl" className="w-full h-auto" open={state ? true : false} handler={() => setState(null)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <EditArticleComponent data={state} complete={editComplete} />
                    </Dialog>
                </div>

            )}
            <div className="w-full p-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {arts && arts.length > 0 && arts.map((article, idx) => (
                    <Articler article={article} key={idx} setState={setState} state={state} />
                ))}
            </div>
        </>
    );
}
