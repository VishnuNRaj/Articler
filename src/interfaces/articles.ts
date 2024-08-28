import { DefaultSession } from "next-auth";

export default interface Users extends DefaultSession {
    name: string | null;
    id: string | null;
    email: string | null;
    profile?: string | null;
}

export interface Content {
    data: "code" | "text" | "image" | "video";
    value: string | File;
}

export interface Add_Article {
    title: string;
    content: Content[];
    published: boolean;
    thumbnail:string | null | File;
    description:string;
    content_type:string;
}

export interface Article extends Add_Article {
    id?:string;
    created_at:Date;
    link:string;
    name?:string;
    email?:string;
    

}

export interface getArticles {
    skip:number;
    search:string;
}