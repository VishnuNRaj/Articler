import { createTransport,  } from "nodemailer"
export default function config() {
    const transporter = createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAILER,
            pass: process.env.MAILERPASSWORD,
        },
    });
    return transporter
}