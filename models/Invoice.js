const { Schema, model } = require("mongoose")

const InvoiceSchema = Schema({
    paymentMethod : {type : Schema.Types.ObjectId, ref : PaymentMethod._id },
    cardNumber : { type : string },
    order : { type : Schema.Types.ObjectId, ref : Order },
},{
    timestamps : true
})
InvoiceSchema.post('save', async function(invoice){
    await model('Order').findByIdAndUpdate(
        {order : Order._id},
        {invoice: invoice._id}
    )
})

InvoiceSchema.post('save', async function(invoice){
    await model('PaymentMethod').findByIdAndUpdate(
        {paymentMethod : PaymentMethod._id},
        {invoices: Invoice._id}
    )
})

const Invoice = model('Invoice', InvoiceSchema)

module.exports = Invoice