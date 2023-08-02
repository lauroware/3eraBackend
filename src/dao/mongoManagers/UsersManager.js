import {userModel} from "./models/users.model.js";
import UsersRepository from "../../repositories/users.repository.js";

const userRepository = new UsersRepository()

export default class UsersManager {
    async createUser(user){
        const newUserRep = await userRepository.createUserRep(user)
        const newUser = await userModel.create(newUserRep)
        return newUser
    }

    async loginUser(user){
        try {
            const usr = await userRepository.loginUserRep(user)
            return usr
        } catch (error) {
            return error
        } 
    }

    async findUserByEmail(email){
        const user = await userModel.findOne({email})
        return user
    }

    async updateOne(idUser, idCart){
        try {
            const updateUser = await userModel.updateOne({_id:idUser},{$set:{cartId:idCart}})
            return updateUser
        } catch (error) {
            return error
        }
    }

    async findUserCart(email){
        const user = await userModel.findOne({email})
        return user.cartId
    }
}