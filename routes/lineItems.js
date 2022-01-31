const express = require("express")
const app = express()

const lineItemCtrl = require("../controllers/lineItems")

app.get('/', lineItemCtrl.getLineItems)

app.get('/:id', lineItemCtrl.getLineItemsId )

app.post('/', lineItemCtrl.createLineItems)

app.put('/:id', lineItemCtrl.modificateLineItems)

app.delete('/:id', lineItemCtrl.deleteLineItems)

module.exports = app



