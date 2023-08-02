import { hashPassword, comparePassword } from "../utils.js"
import { userModel } from "../dao/mongoManagers/models/users.model.js"
import config from "../config.js"
import CartManager from "../dao/mongoManagers/CartManager.js"
import CustomError from "../utils/errors/customError.js"
import { ErrorsMessage, ErrorsName } from "../utils/errors/errors.enum.js"
import logger from "../utils/winston.js"

const cartManager = new CartManager()

export default class UsersRepository {
    async createUserRep(user){
            const {email, password} = user
            const userExist = await userModel.find({email, password})
            if(!userExist){
                CustomError.createCustomError({
                name: ErrorsName.REGISTER_DATA_INCOMPLETE,
                message: ErrorsMessage.REGISTER_DATA_INCOMPLETE
                })}else
            if(email !== "adminCoder@coder.com" & userExist.length===0){
                const hashNewPassword = await hashPassword(password)
                const userCart = await cartManager.addCart()
                const newUser = {...user, cartId: userCart._id, password: hashNewPassword}
                logger.info(`Usuario creado: ${newUser.email}`)
                return newUser} else {
                    if (email === "adminCoder@coder.com" & password === config.ADMIN_PASSWORD){
                        const hashNewPassword = await hashPassword(password)
                        const newAdmin = {...user, role: "admin", password: hashNewPassword}
                        logger.warning(`Admin creado: ${newAdmin.email}`)
                        return newAdmin}
                }
        }         
    

    async loginUserRep(user) {
            const { email, password } = user;
            logger.info(`Intento de logueo: ${email}`);
            const usr = await userModel.findOne({ email });
            if(!usr){CustomError.createCustomError({
                name: ErrorsName.LOGIN_DATA_INCOMPLETE,
                message: ErrorsMessage.LOGIN_DATA_INCOMPLETE
            })}
            const newUsrCart = await cartManager.addCart();
            if (usr && comparePassword(password, usr.password)) {
            usr.cartId = newUsrCart._id;
            await usr.save();
            return usr;
            } else {
            return null;
        }
    }
}