import { productsModels } from "../dao/mongoManagers/models/products.model.js";
import CustomError from "../utils/errors/customError.js";
import { ErrorsName, ErrorsMessage } from "../utils/errors/errors.enum.js";

export default class ProductsRepository {
  async getProducts(limit, page, sort, query) {
    const options = {
      page: page,
      limit: limit,
      sort: sort ? { price: sort } : {},
      lean: true,
    };
    const prodPag = await productsModels.paginate(query, options);
    if (!prodPag || !options) {
      CustomError.createCustomError({
        name: ErrorsName.PRODUCTS_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCTS_DATA_INCOMPLETE,
      });
    } else {
      const prodsPag = {
        status: "success",
        payload: prodPag.docs,
        totalPages: prodPag.totalPages,
        prevPage: prodPag.prevPage,
        nextPage: prodPag.nextPage,
        page: prodPag.page,
        hasPrevPage: prodPag.hasPrevPage,
        hasNextPage: prodPag.hasNextPage,
        prevLink:
          prodPag.hasPrevPage === false
            ? null
            : `http://localhost:8080/api/products/GET?page=${prodPag.prevPage}`,
        nextLink:
          prodPag.hasNextPage === false
            ? null
            : `http://localhost:8080/api/products/GET?page=${prodPag.nextPage}`,
      };
      return prodsPag;
    }
  }

  async updateProduct(prod) {
    const prodToUpdate = await productsModels.findById(prod.id);
    if (!prodToUpdate) {
      CustomError.createCustomError({
        name: ErrorsName.UPDPROD_DATA_INCOMPLETE,
        message: ErrorsMessage.UPDPROD_DATA_INCOMPLETE,
      });
    }
    const newProd = {
      title: prod.title ? prod.title : prodToUpdate.title,
      description: prod.description
        ? prod.description
        : prodToUpdate.description,
      price: prod.price ? prod.price : prodToUpdate.price,
      stock: prod.stock ? prod.stock : prodToUpdate.stock,
      code: prod.code ? prod.code : prodToUpdate.code,
      category: prod.category ? prod.category : prodToUpdate.category,
      status: true,
      thumbnails: prod.thumbnails
        ? prod.thumbnails
        : prodToUpdate.thumbnails || " ",
      id: prod.id,
    };
    const deleteProd = await this.deleteProduct(prodToUpdate);
    const addNewProd = await this.addProducts(newProd);
    return newProd;
  }

  async updateProductStock(productId, newStock) {
    if (!productId) {
      CustomError.createCustomError({
        name: ErrorsName.UPDPROD_DATA_INCOMPLETE,
        message: ErrorsMessage.UPDPROD_DATA_INCOMPLETE,
      });
    }
    const result = await productsModels.findOneAndUpdate(
      { _id: productId },
      { stock: newStock },
      { new: true }
    );
    return result;
  }
}
