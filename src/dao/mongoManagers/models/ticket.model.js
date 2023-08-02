
import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema(
    {
        code: {type: String, unique: true, default: () => Math.random().toString(36).substring(2)},
        purchase_datetime:{type: Date, default: Date.now},
        amount: {type: Number},
        purchaser: {type: String},
    }
)

export const ticketModel = mongoose.model("Tickets", ticketSchema)