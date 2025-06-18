const mongoose = require("mongoose");

const { Schema } = mongoose;

let orderSchema = new Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  order_data:{
    type:Array,
    required:true
  }
})

module.exports = mongoose.model('order',orderSchema)