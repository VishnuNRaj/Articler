"use client";

import { Article } from "@/interfaces/articles";
import { useArticler } from "./Hooks";

export function Articler({ article }: { article: Article }) {
    const { articler } = useArticler(article);

    return (
        <div className="w-full p-4 shadow-lg bg-background h-[200px] flex-col hover:bg-foreground text-foreground hover:text-background flex items-center justify-between rounded-md">
            <div className="w-full flex items-center gap-4 justify-center">
                <h1 className="font-semibold">Title: {articler.title}</h1>
                <h1 className="font-semibold">Content: {articler.content_type}</h1>
            </div>
            {articler && (
                <div className="flex">
                    <div className="w-[20%] flex items-center justify-center flex-shrink-0" style={{ borderRadius: "9999px" }}>
                        <img style={{ borderRadius: "9999px" }} src={articler.thumbnail as string} className="w-28 h-28 object-cover" alt="Article Thumbnail" />
                    </div>
                    <div className="w-[80%] flex-shrink-0 px-2 flex gap-2 items-center justify-center flex-col">
                        <p className="line-clamp-5 overflow-hidden text-ellipsis">{articler.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MyArticles({ articles }: { articles: Article[] }) {
    return (
        <div className="w-full p-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {articles.map((article, idx) => (
                <Articler article={article} key={idx} />
            ))}
        </div>
    );
}
