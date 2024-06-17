//Email Library

import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });
  }

  async sendMail(mailOptions) {
    try {
      mailOptions.from = process.env.EMAIL_FROM; // Set the "from" address
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Message sent successfully:", info);
      return { success: true, msg: "Mail sent successfully" };
    } catch (error) {
      console.error("Error occurred while sending mail:", error);
      return { success: false, msg: error.message };
    }
  }

  async sendWelcomeEmail(to, name) {
    try {
      const mailOptions = {
        to,
        subject: "Welcome to Our Service!",
        html: `<p>Dear ${name},</p>
               <p>Welcome to Our Service! We're glad to have you.</p>
               <p>Thank you for joining us.</p>
               <p>Best regards,</p>
               <p>Our Service Team</p>`,
      };

      return this.sendMail(mailOptions);
    } catch (error) {
      console.error("Error occurred while sending welcome email:", error);
      return { success: false, msg: error.message };
    }
  }
}

export default new MailService();
