import { Router } from "express";
import {
  addProductsController,
  getProductsByIdController,
  getProductsController,
  updateProductController,
  deleteProductController, // <- Asegúrate de importar este controlador
} from "../controllers/products.controller.js"; // <- Verifica la ruta correcta
import { handlePolicies } from "../middlewares/auth.middleware.js";
import { onlyAdm } from "../middlewares/role.middleware.js";
import passport from "passport";

const router = Router();

router.get(
  "/GET",
  handlePolicies(["USER", "ADMIN", "PREMIUM"]),
  getProductsController
);
router.get(
  "/GET/:pid",
  handlePolicies(["USER", "ADMIN"]),
  getProductsByIdController
);
router.post("/POST", onlyAdm, addProductsController);
router.post("/", handlePolicies(["PREMIUM"]), addProductsController);
router.put(
  "/PUT/:pid",
  handlePolicies(["PREMIUM", "ADMIN"]),
  updateProductController
);
router.delete(
  "/DELETE/:pid",
  handlePolicies(["PREMIUM", "ADMIN"]),
  deleteProductController
); // <- Asegúrate de incluir esta ruta

export default router;
