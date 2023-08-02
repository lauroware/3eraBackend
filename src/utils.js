import {dirname} from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { faker } from "@faker-js/faker"

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10)
}

export const comparePassword = async(password, passwordDB)=>{
    return bcrypt.compare(password,passwordDB)
}

export const generateToken = (user)=>{
    return jwt.sign({user}, "secretJWT", {expiresIn:"1d"})
}
export const cookieExtractor = (req)=> {
    const token = req.cookies.token
    return token
};


faker.locale = "es"

export const generateProduct = () =>{
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(1),
        code: faker.random.alphaNumeric(5),
        _id: faker.database.mongodbObjectId(),
        category: faker.commerce.department(),
        status: true,
    }
}