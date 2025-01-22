import { sendContactUsEmail } from "../../Services/ContactUsMail.js";
export default async function SendMails(req, res) {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        sendContactUsEmail({ name, email, phone, message });
        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}