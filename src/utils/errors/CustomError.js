export default class CustomError{
    static createCustomError({name = "Error", message = "Message"}){
        const newError = new Error()
        newError.name = name
        newError.message = message
        throw newError
    }
}