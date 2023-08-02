import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    unique: true
  },
  description:{
    type: String,
  },
  price:{
    type: Number,
  },
  stock:{
    type: Number,
  },
  code:{
    type: Number,
    unique: true
  },
  category:{
    type: String
  },
  status:{
    type: String
  },
  thumbnails:{
    type: String
  }
});

productsSchema.plugin(mongoosePaginate)

export const productsModels = mongoose.model("Products", productsSchema);
