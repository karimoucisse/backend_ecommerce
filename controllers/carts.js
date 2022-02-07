const Cart = require("../models/Cart")

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.find()
        .populate({
            path: 'lineItems',
            select: 'product quantity totalPrice weight',
            populate : {
                path: 'product',
                select: 'kiloPrice pricePerPiece netWeight conditioning fishingArea'
            }
        })
        .exec()
        res.json(cart)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}
// route pour voir un panier grace a son id 
exports.getOneCart = async (req, res) => {
    const {id} = req.params
    try {
        const cartOne = await Cart.findById(id)
        .populate({
            path: 'lineItems',
            select: 'product quantity totalPrice weight',
            populate : {
                path: 'product',
                select: 'kiloPrice pricePerPiece netWeight conditioning fishingArea'
            }
        })
        .exec()
        res.json(cartOne)
    } catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
}

//  function qui crée un panier en base de donnée
exports.createCart = async (req, res) => {
    const cart = await new Cart ({
        ...req.body
    })
    cart.save((err, cart) => {
        if (err) {
            res.status(500).json({error: err})
            return
        }
        res.json(cart)
    })
}

exports.deleteCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete()
        res.json({ success: "Cart deleted"})
    } catch (err) {
        res.status(204).json({ error: err })
    }
}