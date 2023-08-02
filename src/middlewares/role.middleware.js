export const onlyAdm = async(req, res, next)=>{
    try {
        const {user} = req
        if (user.role === "admin"){
        next()
    }else { 
        return res.status(400).send({ message: 'No autorizado' })
    }
    }
    catch (error) {
        return error
    }
}

export const onlyUser = async(req, res, next)=>{
    try {
        const {user} = req
        if (user.role === "user"){
        next()
    }else { 
        return res.status(400).send({ message: 'No autorizado' })
    }
    }
    catch (error) {
        return error
    }
}