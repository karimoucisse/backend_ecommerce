const PaymentMethod = require("../models/PaymentMethod")

exports.getPaymentMethods =  async(req, res) => {
    const paymentMethods = await PaymentMethod.find()
    .populate({
        path: 'user',
        select: 'name phoneNumber adress'
    })
    .exec()
    res.json(paymentMethods)
}

exports.getPaymentMethod = async(req, res) => {
    const { id } = req.params

    const paymentMethod = await PaymentMethod.find({id})
    .populate({
        path: 'user',
        select: 'name phoneNumber adress'
    })
    .exec()
    res.json(paymentMethod)
}

exports.createPaymentMethod = async(req, res) => {
    const paymentMethod = await new PaymentMethod({
        ...req.body
    })

    paymentMethod.save( (err, paymentMethod) => {
        if (err) {
            res.status(500).json({error: err})
            return
        }
        res.json(paymentMethod)
    })
}

exports.modificatePaymentMethod = async(req, res) => {
    const { id } = req.params

    const paymentMethod = await paymentMethod.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
    )

    res.json(paymentMethod)
}

exports.deletePaymentMethod = async(req, res) => {
    const { id } = req.params

    try {
        await PaymentMethod.deleteOne({ _id: id })
        res.json({ success: "PaymentMethod deleted"})
    } catch (err) {
        res.status(204).json({ error: err })
    } 
}