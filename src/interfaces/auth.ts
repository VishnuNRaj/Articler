import { JWT } from "next-auth/jwt";
import { Responses } from "./interfaces";
import Users from "./articles";

export interface RegisterInterface {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    auth_type?:"credential"
}

export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export interface LoginInterface {
    email:string;
    password:string;
}

export interface RegitserResponse extends Responses {
    user:Users;
    error:string;
}


export interface JWTVerifTToken extends JWT {
    email: string;
    verificationLink: string;
}

export default interface UnverifiedUsers {
    name: string;
    email: string;
    password: string;
    auth_api: "google" | "credential" | "github" | "facebook";
    verified: boolean;
    verification_link: string;
    timeout: Date;
    suspended: boolean;
    terminated: boolean;
    id: string;
}