import {Router} from "express"
import passport from "passport"
import SessionsDTO from "../dto/sessions.dto.js"

const router = Router()

router.get("/current", passport.authenticate("jwt", {session:false}), (req, res)=>{
    const userDTO = new SessionsDTO(req.user)
    res.send(userDTO)
})

export default router