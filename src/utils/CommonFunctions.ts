import Path from '@/config/path';
import fetch from 'node-fetch';
import { JWTEncode } from './JWT';

export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


export const shortenUrl = async (longUrl: string): Promise<string> => {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    const shortUrl = await response.text();
    return shortUrl;
};

const generateEmailTemplate = async (verificationLink: string, email: string): Promise<string> => {
    const shortLink = `${Path.BASE_URL}/verify/${await JWTEncode({ verificationLink, email })}`

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .email-container {
                    text-align: center;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                .verification-button {
                    background-color: blue;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-block;
                }
                .copy-icon {
                    cursor: pointer;
                    font-size: 16px;
                    margin-left: 10px;
                }
                .small-text {
                    margin-top: 20px;
                    color: #555;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h2>Email Verification</h2>
                <a href="${shortLink}" class="verification-button">Verify Email</a>
                <p class="small-text">
                    Thank you for signing up. Please verify your email address by clicking the button above. If you didn't request this email, you can safely ignore it.
                </p>
                <p class="small-text">
                    Alternatively, you can copy and paste this link into your browser:
                    <span class="copy-link">${shortLink}</span>
                    <span class="copy-icon" onclick="navigator.clipboard.writeText('${shortLink}')">📋</span>
                </p>
            </div>
        </body>
        </html>
    `;
};



export default generateEmailTemplate;