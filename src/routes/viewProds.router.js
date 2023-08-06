import { Router } from "express";
import { handlePolicies } from "../middlewares/auth.middleware.js";
import { publicRoutes } from "../middlewares/auth.middleware.js";
import { viewProdsController } from "../controllers/products.controller.js";

const router = Router();

router.get(
  "/",
  handlePolicies(["USER", "ADMIN", "PREMIUM"]),
  viewProdsController
);

export default router;
