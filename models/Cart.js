const {Schema, model} = require("mongoose")

const CartSchema = Schema(
    {
        user: {
            type : Schema.Types.ObjectId, ref: "User"
        },
        lineItems : [{
            type : Schema.Types.ObjectId, ref: "LineItem"
        }]
    }, {
        timestamps: true
    }
)

CartSchema.post('save', async function(cart){
    await model('User').findOneAndUpdate(
        {_id : cart.user},
        {cart: cart._id}
    )
    await model('LineItem').findOneAndUpdate(
        {_id: {$in: cart.lineItems}},
        {cart: cart._id}
    )
})


CartSchema.post('findOneAndDelete', async function(cart){
    await model('User').findOneAndUpdate(
        {_id : cart.user},
        {cart: null}
    )
    await model('LineItem').findOneAndUpdate(
        {_id : cart.lineItems},
        {cart: null}
    )
})

const Cart = model("Cart", CartSchema)
module.exports = Cart