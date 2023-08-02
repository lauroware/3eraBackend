import CartManager from "../dao/mongoManagers/CartManager.js";
import ProductManager from "../dao/mongoManagers/ProductManager.js";
import { ticketModel } from "../dao/mongoManagers/models/ticket.model.js";

const cartManager = new CartManager();
const productManager = new ProductManager();

export const getCartByIdController = async (req, res) => {
  const { cid } = req.params;
  const cartById = await cartManager.getCartsById(cid);
  res.json({ cartById });
};

export const addCartController = async (req, res) => {
  const addCart = await cartManager.addCart();
  res.json({ addCart });
};

export const addProductToCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const addProdToCart = await cartManager.addProductToCart(cid, pid);
  res.json({ addProdToCart });
};

export const deleteCartController = async (req, res) => {
  const { cid } = req.params;
  const dltCart = await cartManager.deleteCart(cid);
  res.json({ dltCart });
};

export const deleteProductOnCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const dltProd = await cartManager.deleteProductOnCart(cid, pid);
  res.json({ dltProd });
};

export const updateCartController = async (req, res) => {
  const newProds = req.body;
  const { cid } = req.params;
  const updCart = await cartManager.updateCart(newProds, cid);
  res.json({ updCart });
};

export const updateQuantController = async (req, res) => {
  const newQuant = req.body;
  const { cid, pid } = req.params;
  const updStock = await cartManager.updateQuant(newQuant, cid, pid);
  res.json(updStock);
};

export const viewCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartsById(cid);
    const cartProducts = cart.products; // Obtener los productos del carrito

    res.render("cart", { cart: cartProducts }); // Pasar los productos del carrito como un objeto con clave "cart"
  } catch (error) {
    return error;
  }
};

export const purchaseCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const { user } = req; // El usuario autenticado está disponible en req.user
    const productsBought = await cartManager.purchaseCart(cid, user);
    res.json(productsBought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
