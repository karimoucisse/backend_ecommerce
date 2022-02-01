const Order = require("../models/Order")

exports.createOrder = async(req, res) => {
    const order = await new Order ({
        deliveryDate: req.body.deliveryDate,
        user: req.body.user,
        lineItems: req.body.lineItems
    })

    order.save((err, order) => {
        if (err) {
            res.status(500).json({error: err})
            return
        }
        res.json(order)
    })
}

exports.getOrders = async(req, res) => {
    const order = await Order.find()
    .populate({
        path: 'user',
        select : 'name phoneNumber adress'
    
    })
    .exec()
    res.json(order)
}

exports.getOrderId =  async(req, res) => {
    const { id } = req.params
    const order = await Order.find({id})
    .populate({
        path: 'user',
        select : 'name phoneNumber adress'
    
    })
    .exec()
    res.json(order)
}