import { messageModel } from "../dao/mongoManagers/models/messages.model.js";


export default class MsgRepository{
    getMsgs = async () => {
        const msgs = await messageModel.find()
        return msgs
    }
    createMsg = async (message) =>{
    const msg = await messageModel.create(message)
    return msg}
}