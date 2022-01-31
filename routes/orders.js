const express = require("express")
const app = express()

const orderCtrl = require("../controllers/orders")

app.get('/', orderCtrl.getOrders)

app.get('/:id', orderCtrl.getOrderId)

app.post('/', orderCtrl.createOrder )



module.exports = app