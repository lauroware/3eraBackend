import fs from "fs";
export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./src/utils/products.json";
  }

  async addProducts(prod) {
    try {
      const prodsFile = await this.getProducts();
      const productCode = this.#validateCodeProduct(prod.code);

      const product = {
        id: this.#generateId(),
        status: true,
        ...prod,
      };

      if (
        productCode === undefined &&
        prod.title &&
        prod.description &&
        prod.price &&
        prod.stock &&
        prod.code &&
        prod.category
      ) {
        prodsFile.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(prodsFile));
      }
    } catch (error) {
      console.log("error");
    }
  }

  #validateCodeProduct(code) {
    return this.products.find((prd) => prd.code === code);
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(products);
        return this.products;
      } else {
        return (this.products = []);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsById(id) {
    const prodsFileId = await this.getProducts();
    const productById = prodsFileId.find((product) => product.id === id);
    if (productById === undefined) {
      console.log("Not found");
    } else {
      return productById;
    }
  }

  async updateProduct(prod) {
    const prodToUpdate = await this.getProductsById(parseInt(prod.id));
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
      id: parseInt(prod.id),
    };
    this.products.push(newProd);
    const indexProdToUpdate = this.products.indexOf(prodToUpdate);
    this.products.splice(indexProdToUpdate, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    return newProd;
  }

  async deleteProduct(prodId) {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === prodId);
    if (index !== -1) {
      products.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
    return products;
  }

  #generateId() {
    let id = 1;
    if (this.products.length !== 0) {
      id = this.products[this.products.length - 1].id + 1;
    }
    return id;
  }
}
