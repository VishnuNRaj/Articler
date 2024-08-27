export { default } from "next-auth/middleware"

export const config = { matcher: ["/","/profile","/settings","/article","/add-article"] }