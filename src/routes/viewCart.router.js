import { Router } from "express"
import { viewCartController } from "../controllers/carts.controller.js"
const router = Router()

router.get("/:cid", viewCartController)

export default router