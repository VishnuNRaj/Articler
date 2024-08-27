import config from "@/config/mailer";
import { EmailOptions } from "@/interfaces/auth";
const sendEmail = async (options: EmailOptions) => {
    const transporter = config()
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendEmail;
