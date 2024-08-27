"use client";
import { Article } from "@/interfaces/articles";
import { useState } from "react";

export default function useHome() {
    const [state,setState] = useState<Article | null>(null);
    return {state,setState}
}