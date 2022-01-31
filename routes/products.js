const express = require('express')
const app = express()
const Products = require('../models/Product')

// route pour voir tout les produit
app.get('/', async (req, res) => {
    try {
        const products = await Products.find().exec()
        res.json(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({error : err})
    }
})

// route qui crée un produit (mais me renvoie une erreur voir avec benoit =))
app.post('/', async (req, res) => {
    try {
        const product = new Products({
            ...req.body
        })
        product.save( async (err, product) => {
            if (product) {
                res.json(product)
                return
            }
            console.log(err)
            res.status(500).json({ error: err })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})
module.exports = app