// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,   // admin email
//     pass: process.env.EMAIL_PASS    // Gmail App Password
//   }
// });

// // Function to send email
// export const sendEmail = async ({ name, email, address, message }) => {
//   const mailOptions = {
//     from: `"Contact Form" <${process.env.EMAIL_USER}>`, // sender
//     to: process.env.EMAIL_USER,                         // admin email
//     replyTo: email,                                     // user email for reply
//     subject: "New Contact Form Submission",
//     html: `
//       <h3>New Contact Form Submission</h3>
//       <p><b>Name:</b> ${name}</p>
//       <p><b>Email:</b> ${email}</p>
//       <p><b>Address:</b> ${address}</p>
//       <p><b>Message:</b><br/>${message}</p>
//     `
//   };

//   await transporter.sendMail(mailOptions);
// };


import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================================
   CONTACT FORM EMAIL (Existing)
========================================= */
export const sendEmail = async ({ name, email, address, message }) => {
  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "New Contact Form Submission",
    html: `
      <h3>New Contact Form Submission</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Address:</b> ${address}</p>
      <p><b>Message:</b><br/>${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

/* =========================================
   SUBSCRIBERS BROADCAST EMAIL
========================================= */
export const sendBulkEmail = async ({ emails, subject, html }) => {
  if (!emails || emails.length === 0) return;

  const mailOptions = {
    from: `"Hypernex" <${process.env.EMAIL_USER}>`,
    bcc: emails, // BCC so emails remain private
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
