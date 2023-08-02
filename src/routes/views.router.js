import { Router } from "express";

const router = Router()

router.get("/", (req, res)=>{
    res.render("login")
})

router.get("/register", (req, res)=>{
    res.render("register")
})

router.get("/registerError", (req, res)=>{
    res.render("registerError")
})

router.get("/loginError", (req, res)=>{
    res.render("loginError")
})



export default router