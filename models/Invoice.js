const { Schema, model } = require("mongoose")

const InvoiceSchema = Schema({
    paymentMethod: {type: Schema.Types.ObjectId, ref: "PaymentMethod"},
    cardNumber: { type: String },
    order: { type: Schema.Types.ObjectId, ref: "Order"},
},{
    timestamps : true
})

InvoiceSchema.post('save', async function(invoice){
    await model('Order').findOneAndUpdate(
        {_id: invoice.order},
        {invoice: invoice._id}
    )
    await model('PaymentMethod').findOneAndUpdate(
        {_id: invoice.paymentMethod},
        {$push: {invoices: invoice._id}}
    )
})

const Invoice = model('Invoice', InvoiceSchema)

module.exports = Invoice