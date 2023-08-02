import { Router } from "express";
import logger from "../utils/winston.js";

const router = Router()

router.get("/", (req, res)=>{
    logger.fatal("Test log fatal")
    logger.error("Test log error")
    logger.warning("Test log warning")
    logger.info("Test log info")
    logger.http("Test log http")
    logger.debug("Test log debug")
})

export default router