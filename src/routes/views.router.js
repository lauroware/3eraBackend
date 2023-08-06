import { Router } from "express";
import { privateRoutes, publicRoutes } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/registerError", (req, res) => {
  res.render("registerError");
});

router.get("/loginError", (req, res) => {
  res.render("loginError");
});

router.get("/forget-password", (req, res) => {
  res.render("sessions/forget-password");
});

router.get("/reset-password/:token", (req, res) => {
  res.redirect(`/api/sessions/verify-token/${req.params.token}`);
});

router.get("/profile", publicRoutes, (req, res) => {
  const userDTO = new userDTO(req.session.user);
  res.render("sessions/profile", userDTO);
});

export default router;
