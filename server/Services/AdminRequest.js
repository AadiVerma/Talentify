import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.ADMIN_EMAIL}`,
        pass: `${process.env.ADMIN_PASSWORD}`
    }
});

export async function SendAdminRequest({ name, email, skills, description }) {
    try {
        const info = await transporter.sendMail({
            from: `"Talentify" <${email}>`,
            to: `${process.env.ADMIN_EMAIL}`,
            subject: `New Contact Form Submission: For Some Query`,
            text: `
                Name: ${name}
                Email: ${email}
                Phone: ${skills}
                Message: ${description}
            `,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f9fafb;
        }
        .wrapper {
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            margin: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .header {
            background-color: #1d4ed8; /* blue-700 */
            padding: 32px 24px;
            text-align: center;
        }
        .logo {
            width: 180px;
            height: auto;
            margin-bottom: 16px;
        }
        .title {
            color: white;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            letter-spacing: -0.025em;
        }
        .content {
            padding: 32px 24px;
            background-color: #ffffff;
        }
        .field {
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid #e5e7eb;
        }
        .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .label {
            font-size: 14px;
            font-weight: 600;
            color: #1d4ed8; /* blue-700 */
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
        }
        .value {
            font-size: 16px;
            color: #374151;
            margin: 0;
        }
        .footer {
            text-align: center;
            padding: 24px;
            background-color: #f3f4f6;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
        }
        .timestamp {
            font-size: 12px;
            color: #9ca3af;
            margin-top: 8px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #1d4ed8;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            margin-top: 16px;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <svg width="180" height="40" viewBox="0 0 180 40" style="margin: 0 auto;">
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
                      fill="white" font-size="24" font-weight="bold">
                    Talentify
                </text>
            </svg>
            <h1 class="title">New Job-Seeker Request</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name</div>
                <p class="value">${name}</p>
            </div>
            <div class="field">
                <div class="label">Email Address</div>
                <p class="value">${email}</p>
            </div>
            <div class="field">
                <div class="label">Skills</div>
                <p class="value">${skills}</p>
            </div>
            <div class="field">
                <div class="label">Description</div>
                <p class="value">${description}</p>
            </div>
        </div>
        <div class="footer">
            <p class="footer-text">This request was sent via Talentify Job-Seeker Submission</p>
            <p class="timestamp">${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>`
        });
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
}
