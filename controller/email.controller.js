import { sendEmail } from "../services/emailService.js";

// Controller function
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, address, message } = req.body;

    // Validate
    if (!name || !email || !address || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Send email via service
    await sendEmail({ name, email, address, message });

    // Response
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
