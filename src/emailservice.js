// emailService.js
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import config from "./config.js";

sgMail.setApiKey(config.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "lauro.ware@gmail.com", // Reemplaza con tu dirección de correo electrónico
    to,
    subject,
    text,
  };

  try {
    const result = await sgMail.send(mailOptions);
    console.log("Correo enviado correctamente:", result);
    return result;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};
