const Cart = require("../models/Cart")

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.find()
        .exec()
        res.json(cart)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.deletCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete()
        res.json({ success: "Cart deleted"})
    } catch (err) {
        res.status(204).json({ error: err })
    }
}