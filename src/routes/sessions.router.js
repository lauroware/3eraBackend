import { Router } from "express";
import passport from "passport";
import SessionsDTO from "../dto/sessions.dto.js";
import nodemailer from "nodemailer";
import { userModel } from "../dao/mongoManagers/models/users.model.js";
import UserPasswordModel from "../dao/mongoManagers/models/user-password.model.js";
import { generateRandomString, createHash } from "../utils.js";
import config from "../config/config.js";
import { PORT } from "../app.js";

const router = Router();

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userDTO = new SessionsDTO(req.user);
    res.send(userDTO);
  }
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.MAILER_USER, // Reemplaza con tu dirección de correo electrónico de Gmail
    pass: config.MAILER_PASS, // Reemplaza con la contraseña de tu cuenta de Gmail
  },
});

router.post("/forget-password", async (req, res) => {
  const email = req.body.email;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ status: "error", error: "User not found" });
  }
  const token = generateRandomString(16);
  await UserPasswordModel.create({ email, token });
  const mailerConfig = {
    service: "gmail",
    auth: { user: config.nodemailer.user, pass: config.nodemailer.pass },
  };
  let transporter = nodemailer.createTransport(mailerConfig);
  let message = {
    from: config.nodemailer.user,
    to: email,
    subject: "[Lauro APP] Resetea tu password",
    html: `<h1>[Lauro APP] Reseteo de password</h1><hr />You have asked to reset your password. You can do it here: <a href="http://${req.hostname}:${PORT}/views/reset-password/${token}">http://${req.hostname}:${PORT}/reset-password/${token}</a><hr />Best regards,<br><strong>The Coder e-comm API team</strong>`,
  };
  try {
    await transporter.sendMail(message);
    res.json({
      status: "success",
      message: `Email successfully sent to ${email} in order to reset password`,
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

router.get("/verify-token/:token", async (req, res) => {
  const userPassword = await UserPasswordModel.findOne({
    token: req.params.token,
  });
  if (!userPassword) {
    return res.status(404).json({
      status: "error",
      error: "Token no válido / El token ha expirado",
    });
  }
  const user = userPassword.email;
  res.render("sessions/reset-password", { user });
});

router.post("/reset-password/:user", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.user });
    await userModel.findByIdAndUpdate(user._id, {
      password: createHash(req.body.newPassword),
    });
    res.json({
      status: "success",
      message: "Se ha creado una nueva contraseña",
    });
    await UserPasswordModel.deleteOne({ email: req.params.user });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.get("/premium/:uid", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.uid);
    await userModel.findByIdAndUpdate(req.params.uid, {
      role: user.role === "user" ? "premium" : "user",
    });
    res.json({
      status: "success",
      message: "Se ha actualizado el rol del usuario",
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

export default router;
