import mongoose from "mongoose";
import config from "../../config.js";

const URI = config.MONGOURL

mongoose.set("strictQuery",false)

mongoose.connect(URI)

if(mongoose.connect(URI)){
    console.log("Conectado a la DB");
}