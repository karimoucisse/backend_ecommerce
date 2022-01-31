const express = require("express")
const app = express()

const paymentMethodCtrl = require("../controllers/paymentMethods")


app.post('/', paymentMethodCtrl.createPaymentMethod)

app.get('/', paymentMethodCtrl.getPaymentMethods)

app.get('/:id', paymentMethodCtrl.getPaymentMethod)

app.put('/:id', paymentMethodCtrl.modificatePaymentMethod)

app.delete('/:id', paymentMethodCtrl.deletePaymentMethod)


module.exports = app