const { Schema, model } = require("mongoose")

const LineItemSchema = Schema({
    product : { type : Schema.Types.ObjectId, ref : "Product"},
    quantity : { type : Number , required : true },
    weight : { type : Number , required : true },
    totalPrice : { type : Number},
    cart : { type : Schema.Types.ObjectId, ref : "Cart", default: null},
    order : { type : Schema.Types.ObjectId, ref : "Order"},
},{
    timestamps : true
})

const LineItem = model('LineItem', LineItemSchema)

module.exports = LineItem