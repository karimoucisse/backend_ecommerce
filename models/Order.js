const {Schema, model} = require("mongoose")

const OrderSchema = Schema(
    {
        date_cmd: {
            type: Date,
            required: true
        },
        user: {
            type : Schema.Types.ObjectId, ref: "User"
        },
        lineItems : [{
            type : Schema.Types.ObjectId, ref: "lineItems"
        }],
        invoice: {
            type : Schema.Types.ObjectId, ref: "Invoice"
        }
    }, {
        timestamps: true
    }
)

OrderSchema.post('save', async function(order){
    await model('User').findByIdAndUpdate(
        {_id : order.user},
        {$push : {orders: order._id}}
    )
})

OrderSchema.post('save', async function(order){
    await model('Invoice').findByIdAndUpdate(
        {_id : order.user},
        {invoice: order._id}
    )
})

const Order = model("Order", OrderSchema)
module.exports = Order