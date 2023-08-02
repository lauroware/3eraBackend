import { Router } from "express";
import {
  addProductsController,
  getProductsByIdController,
  getProductsController,
  updateProductController,
  deleteProductController, // <- Asegúrate de importar este controlador
} from "../controllers/products.controller.js"; // <- Verifica la ruta correcta

import { onlyAdm } from "../middlewares/role.middleware.js";
import passport from "passport";

const router = Router();

router.get("/GET", getProductsController);
router.get("/GET/:pid", getProductsByIdController);
router.post("/POST", onlyAdm, addProductsController);
router.put("/PUT/:pid", onlyAdm, updateProductController);
router.delete("/DELETE/:pid", onlyAdm, deleteProductController); // <- Asegúrate de incluir esta ruta

export default router;
