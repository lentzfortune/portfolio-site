import dotenv from "dotenv";
import express from "express";
import sgMail from "@sendgrid/mail";

dotenv.config({ path: "sendgrid.env" });

const app = express();
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

app.use(express.json({ limit: "20kb" }));

app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (![firstName, lastName, email, message].every(
    (value) => typeof value === "string" && value.trim(),
  )) {
    return res.status(400).json({ message: "Please complete every field." });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  if (
    !process.env.SENDGRID_API_KEY?.startsWith("SG.")
    || !emailPattern.test(process.env.SENDGRID_FROM_EMAIL || "")
    || !emailPattern.test(process.env.CONTACT_TO_EMAIL || "")
  ) {
    console.error("SendGrid configuration is missing or invalid. Check the API key, sender email, and recipient email.");
    return res.status(500).json({ message: "Email service is not configured." });
  }

  const escapeHtml = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to: process.env.CONTACT_TO_EMAIL || process.env.SENDGRID_FROM_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      replyTo: email.trim(),
      subject: `Portfolio message from ${firstName.trim()} ${lastName.trim()}`,
      text: `Name: ${firstName.trim()} ${lastName.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName.trim())} ${escapeHtml(lastName.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message.trim()).replaceAll("\n", "<br>")}</p>
      `,
    });

    return res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    return res.status(500).json({ message: "Unable to send message right now." });
  }
});

export default app;
