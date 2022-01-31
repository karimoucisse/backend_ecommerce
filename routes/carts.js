const express = require("express")
const app = express()

const Cart = require("../models/Cart")

app.get("/", async (req, res) => {
    try {
        const cart = await Cart.find()
        .exec()
        res.json(cart)
    } catch (err) {
        res.status(500).json({ error: err})
    }
})

module.exports = app