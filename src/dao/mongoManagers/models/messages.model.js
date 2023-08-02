import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    user:{
        required: true,
        unique: true,
        type: String
    },
    message:{
        required: true,
        unique: true,
        type: String
    }
})

export const messageModel = mongoose.model("Messages", messagesSchema);
    