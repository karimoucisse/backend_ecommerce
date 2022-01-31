const {Schema, model} = require("mongoose")

const OrderSchema = Schema(
    {
        deliveryDate: {
            type: Date,
            required: true
        },
        user: {
            type : Schema.Types.ObjectId, ref: "User"
        },
        lineItems : [{
            type : Schema.Types.ObjectId, ref: "LineItem"
        }],
        invoice: {
            type : Schema.Types.ObjectId, ref: "Invoice"
        }
    }, {
        timestamps: true
    }
)

OrderSchema.post('save', async function(order){
    await model('User').findOneAndUpdate(
        {_id : order.user},
        {$push : {orders: order._id}}
    )
})


const Order = model("Order", OrderSchema)
module.exports = Order