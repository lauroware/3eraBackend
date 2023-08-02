import { Router } from "express"
import { viewProdsController } from "../controllers/products.controller.js"

const router = Router()

router.get("/", viewProdsController)

export default router