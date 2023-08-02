import CartsRepository from "../../repositories/carts.repository.js";
import { cartsModel } from "./models/carts.model.js";
import ProductManager from "./ProductManager.js";
import CustomError from "../../utils/errors/customError.js";
import { ErrorsName, ErrorsMessage } from "../../utils/errors/errors.enum.js"


const productManager = new ProductManager()
const cartsRepository = new CartsRepository()

export default class CartManager{
    async getCarts(){
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (error) {
            CustomError.createCustomError({
                name: ErrorsName.CART_DATA_INCOMPLETE,
                message: ErrorsMessage.CART_DATA_INCOMPLETE
            })
        }
    }

    async getCartsById(cartId){
        try {
            const cartById = await cartsModel.findOne({_id:cartId}).lean()
            if(cartById !== null){return cartById}
            else {CustomError.createCustomError({
                name: ErrorsName.CART_DATA_INCOMPLETE,
                message: ErrorsMessage.CART_DATA_INCOMPLETE
            })}
        } catch (error) {
            return error
        }
    }

    async addCart(){
        try {
            const cartToAdd = await cartsModel.create({})
            return cartToAdd
        } catch (error) {
            return error
        }
    }
    
    async addProductToCart(cartId, prodId){
        try {
        const prod = await cartsRepository.addProductToCart(cartId, prodId)
        return prod
        } catch (error) {
        CustomError.createCustomError({
        name: ErrorsName.CARTPRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
        })}
        }

    async deleteCart(cartId){
        try {
            const cartById = await cartsRepository.deleteCart(cartId)
            return cartById
        } catch (error) {
            return error
        }
    }

    async deleteProductOnCart(cartId, prodId){
        try {
            const deleteProd = await cartsRepository.deleteProductOnCart(cartId, prodId)
            return deleteProd
        } catch (error) {
            return error
        }
    }
    
    async updateCart(newProds, cid){
        try {
        const updCart = await cartsRepository.updateCart(newProds, cid)
        return updCart
        } catch (error) {
            return error
        }
    }

    async updateQuant(quant, cid, pid){
        try {
        const updQuant = await cartsRepository.updateQuant(quant, cid, pid)
        return updQuant
        } catch (error) {
            return error
        }
    }

    async purchaseCart(cartId, user){
        try {
            const purchaseCart = await cartsRepository.purchaseCart(cartId, user)
            return purchaseCart
        } catch (error) {
            return error
        }
    }
}