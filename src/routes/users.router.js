import { Router } from "express";
import passport from "passport";
import { logoutController, registerUserController } from "../controllers/users.controller.js";
import logger from "../utils/winston.js";

const router = Router()

router.post("/register", registerUserController)

router.post("/login", passport.authenticate("login",{failureRedirect: "/views/loginError", successRedirect: "/products", passReqToCallback: true}))

router.get("/registerGitHub", passport.authenticate("github",{ scope: [ 'user:email' ] }))

router.get("/GitHub", passport.authenticate("github"), (req, res)=>{
    req.session.email = req.user.email
    res.redirect("/products/")
})

router.get("/logout", logoutController)

export default router