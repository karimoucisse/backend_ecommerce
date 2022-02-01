const express = require('express')
const app = express()
const productsCtrl = require('../controllers/products')
const {verifyAdmin} = require('../middlewares/admin')
// route pour voir tout les produit (user et admin)
app.get('/', productsCtrl.getProducts)
// route qui renvoi un seul produit avec l'id (user)
app.get('/:id',productsCtrl.getOneProduct)

// route qui crée un produit (pour l'admin)
app.post('/', verifyAdmin, productsCtrl.createProductAdmin)
//route pour modifier les information de un seul produit(prix, description, etc..)(admin)
app.put("/:id", verifyAdmin, productsCtrl.modifyOneProduitAdmin)


module.exports = app