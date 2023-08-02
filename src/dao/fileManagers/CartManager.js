import fs from "fs"
import ProductManager from "./ProductManager.js"

const productManager = new ProductManager()

export default class CartManager{

    constructor(){
        this.carts = []
        this.path = "./src/utils/carts.json"
    }

    async getCarts(){

        try{
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, "utf-8")
                this.carts = JSON.parse(carts)
                return this.carts
            } else{
                return this.carts = []
            }
        } catch(error){
            console.log(error)
        }}
    
    async getCartsById(id){
        const cartsFileId = await this.getCarts()
        const cartById = cartsFileId.find(cart=>cart.id===id)
        if(cartById === undefined){
            console.log("El carrito no existe")
        } else {
            return cartById.products
        }
    }

    async addCart(){
        try {
            const cartsFile = await this.getCarts()

            let cart = {
                id: this.#generateId(),
                products: []
            }

            this.carts.push(cart)

            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
        }

        catch(error){
            console.log(error)
        }
    }

    async addProductToCart(cartId, prodId){
        const cartById = await this.getCartsById(cartId)
        const prodById = await productManager.getProductsById(prodId)
        const newProdToCart = {
            id: prodById.id,
            quantity: 1
        }
        if(cartById.length === 0){
            cartById.push(newProdToCart)
            return await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
        } else{
            const findProdOnCart = cartById.find(prod=>prod.id===prodId)
            if(findProdOnCart){
                findProdOnCart.quantity++
                return await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            } else{
                cartById.push(newProdToCart)
                return await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            }
        }
    }

    #generateId() {
        let id = 1
        if (this.carts.length !== 0){
            id = this.carts[this.carts.length - 1].id + 1
        }
        return id
    }

    }
    