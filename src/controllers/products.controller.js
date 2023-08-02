import ProductManager from "../dao/mongoManagers/ProductManager.js";
import UsersManager from "../dao/mongoManagers/UsersManager.js";

const productManager = new ProductManager();
const userManager = new UsersManager();

export const getProductsController = async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query;
  const products = await productManager.getProducts(limit, page, sort, query);
  res.json({ products });
};

export const getProductsByIdController = async (req, res) => {
  const { pid } = req.params;
  const productById = await productManager.getProductsById(pid);
  res.json({ productById });
};

export const addProductsController = async (req, res) => {
  const newProd = req.body;
  const addProd = await productManager.addProducts(newProd);
  res.json({ message: "Producto creado con éxito", addProd });
};

export const updateProductController = async (req, res) => {
  const upProd = req.body;
  const { pid } = req.params;
  upProd.id = pid;
  const updateProd = await productManager.updateProduct(upProd);
  res.json({ message: "Producto actualizado con éxito", updateProd });
};

export const deleteProductController = async (req, res) => {
  const { pid } = req.params;
  try {
    const deleteProd = await productManager.deleteProduct(pid);
    res.json({ message: "Producto eliminado con éxito", deleteProd });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

export const viewProdsController = async (req, res) => {
  try {
    const { user } = req;
    const { limit = 10, page = 1, sort, ...query } = req.query;
    const products = await productManager.getProducts(limit, page, sort, query);
    const usr = await userManager.findUserByEmail(user.email);
    const productsWithCartId = products.payload.map((product) => {
      return { ...product, cartId: usr.cartId };
    });
    res.render("products", {
      usr: usr.toObject(),
      products: productsWithCartId,
    });
  } catch (error) {
    return error;
  }
};
