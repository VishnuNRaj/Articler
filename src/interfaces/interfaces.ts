export interface Redirects {
    path: "/login" | "/register" | "/" | "/profile" | "/settings" | "/articles" | "/add-article" | `/articles/${string}`;
}

export interface Responses {
    message:string;
    status:number;
}