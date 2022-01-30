const { Schema, model } = require("mongoose")

const LineItemSchema = Schema({
    product : { type : Schema.Types.ObjectId, ref : Product},
    quantity : { type : Number , required : true },
    weight : { type : Number , required : true },
    totalPrice : { type : Number},
    cart : { type : Schema.Types.ObjectId, ref : Cart},
    order : { type : Schema.Types.ObjectId, ref : Order},
},{
    timestamps : true
})

const lineItem = model('lineItem', LineItemSchema)

module.exports = lineItem