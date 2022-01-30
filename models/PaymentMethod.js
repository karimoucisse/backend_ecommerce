const {Schema, model} = require("mongoose")

const PaymentMethodSchema = Schema(
    {   
        cardNumber: {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        user: {
            type : Schema.Types.ObjectId, ref: "User"
        },
        invoices : [{
            type : Schema.Types.ObjectId, ref: "Invoice"
        }]
    }, {
        timestamps: true
    }
)

PaymentMethodSchema.post('save', async function(paymentMethod){
    await model('User').findOneAndUpdate(
        {_id : paymentMethod.user},
        {$push : {paymentMethod: paymentMethod._id}}
    )
})

PaymentMethodSchema.post('save', async function(paymentMethod){
    await model('Invoice').findByIdAndUpdate(
        {$in : {_id : paymentMethod.invoices}},
        {paymentMethod: paymentMethod._id}
    )
})

PaymentMethodSchema.post('findOneAndDelete', async function(paymentMethod){
    await model('User').findOneAndUpdate(
        {_id : paymentMethod.user},
        {$pull : {paymentMethod: paymentMethod._id}}
    )
})

PaymentMethodSchema.post('findOneAndDelete', async function(paymentMethod){
    await model('Invoice').findOneAndUpdate(
        {$in : {_id : paymentMethod.invoices}},
        {paymentMethod: null}
    )
})

const PaymentMethod = model("PaymentMethod", PaymentMethodSchema)
module.exports = PaymentMethod