const express = require('express')
const app = express()
const invoiceCtrl =  require('../controllers/invoice')
// route pour voir les facture en base de donnée (user et admin)
app.get("/",invoiceCtrl.getAllInvoice)

// route qui crée une facture (admin i dont now)
app.post('/',invoiceCtrl.createInvoice)

module.exports = app