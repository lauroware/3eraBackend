import MessageManager from "../dao/mongoManagers/MessageManager.js"
import {socketServer} from "../app.js"

const msgManager = new MessageManager()

/* export const getMsg = async (req, res) => {
    const msgs = [] 
    const msgs = await msgManager.getMsgs() 

socketServer.on("connection", socket=>{
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on("disconnect",()=>{
        console.log("Usuario desconectado")
    })

    socket.on("newUser",user=>{
        console.log("Usuario:", user);
    })

    socket.on("message",async (info)=>{
        await msgManager.createMsg(info)
        const allMsgs = await msgManager.getMsgs()
        socketServer.emit("chat", allMsgs)
    })

    socketServer.emit("chat", msgs)
})
res.render("chat")} */

export const getMsg = async (req,res)=>{

const messages = await msgManager.getMsgs()

socketServer.on("connection", socket=>{
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on("disconnect",()=>{
        console.log("Usuario desconectado")
    })

    socket.on("newUser",user=>{
        console.log("Usuario:", user);
    })

    socket.on("message",async info=>{
        messages.push(info)
        socketServer.emit("chat", messages)
        await msgManager.createMsg(info)
    })
})

res.render("chat")
}