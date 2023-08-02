import UsersManager from "../dao/mongoManagers/UsersManager.js";
import { generateToken } from "../utils.js";

const userManager = new UsersManager()

export const registerUserController = async (req, res)=>{
    const newUser = await userManager.createUser(req.body)
    const token = generateToken(newUser)
    res.cookie("token", token)
    if(newUser){
        res.redirect("/views")
    } else {
        res.redirect("/views/registerError")
    }
}

export const logoutController = async (req,res)=>{
    req.session.destroy(error=>{
        if(error){console.log(error)}
        res.redirect("/views")
    })
}