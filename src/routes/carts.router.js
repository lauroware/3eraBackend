import { Router } from "express";
import {
  getCartByIdController,
  addCartController,
  addProductToCartController,
  deleteProductOnCartController,
  deleteCartController,
  updateCartController,
  updateQuantController,
  purchaseCartController,
} from "../controllers/carts.controller.js";
import { onlyAdm, onlyUser } from "../middlewares/role.middleware.js";
import passport from "passport";

const router = Router();

router.get("/GET/:cid", getCartByIdController);

router.post("/POST", addCartController);

router.post("/POST/:cid/product/:pid", addProductToCartController);

router.delete("/:cid/", deleteCartController);

router.delete("/:cid/products/:pid", deleteProductOnCartController);

router.put("/:cid", updateCartController);

router.put("/:cid/products/:pid", updateQuantController);

router.get("/:cid/purchase", onlyUser, purchaseCartController);

export default router;
