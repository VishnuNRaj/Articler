"use client";

import { Dialog } from "@material-tailwind/react";
import EditArticleComponent from "../EditArticle/EditArticleComponent";
import useHome from "./Hooks";

export default function HomeComponent() {
    const { setState, state } = useHome()
    return (
        <div className="w-full flex items-center justify-center">
            <h1 className="font-semibold text-white">Home</h1>
            <Dialog open={state ? true : false} size="xxl" className="w-full overflow-y-scroll h-[600px]" handler={() => setState(null)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <EditArticleComponent data={{ content: [], title: "", id: "1", createdAt: new Date(), published: true }} />
            </Dialog>
        </div>

    )
}