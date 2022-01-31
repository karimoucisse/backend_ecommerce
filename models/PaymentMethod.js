const {Schema, model} = require("mongoose")

const PaymentMethodSchema = Schema(
    {   
        cardNumber: {
            type : String,
            required : true
        },
        name: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId, ref: "User"
        },
        invoices: [{
            type: Schema.Types.ObjectId, ref: "Invoice"
        }]
    }, {
        timestamps: true
    }
)

PaymentMethodSchema.post('save', async function(paymentMethod){
    await model('User').findOneAndUpdate(
        {_id: paymentMethod.user},
        {$push: {paymentMethods: paymentMethod._id}}
    )
})

PaymentMethodSchema.post('findOneAndDelete', async function(paymentMethod){
    await model('User').findOneAndUpdate(
        {_id: paymentMethod.user},
        {$pull: {paymentMethods: paymentMethod._id}}
    )
    await model('Invoice').updateMany(
        {_id: {$in : paymentMethod.invoices}},
        {paymentMethod: null}
    )
})
    
const PaymentMethod = model("PaymentMethod", PaymentMethodSchema)
module.exports = PaymentMethod