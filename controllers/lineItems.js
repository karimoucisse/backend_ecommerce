const LineItem = require("../models/LineItem")

exports.getLineItems = async(req, res) => {
    const lineItems = await LineItem.find()
    .exec()
    res.json(lineItems)
}

exports.getLineItemsId = async(req, res) => {
    const { id } = req.params

    const lineItem = await LineItem.findOne({ id })
    .exec()

    res.json(lineItem)
}

exports.createLineItems = async(req, res) => {
    const lineItem = await new LineItem({
        ...req.body
    })

    lineItem.save((err, lineItem) => {
        if (err) {
            res.status(500).json({error: err})
            return
        }
        res.json(lineItem)
    })
}

exports.modificateLineItems = async(req, res) => {
    const { id } = req.params
    const lineItem = await LineItem.findOneAndUpdate(
        {_id: id },
        { $set: {...req.body }},
        { new: true}
    )

    res.json(lineItem)
}

exports.deleteLineItems = async(req, res) => {
    const { id } = req.params

    try {
        await LineItem.deleteOne({ _id: id })
        res.json({ success: "LineItem deleted"})
    } catch (err) {
        res.status(204).json({ error: err })
    } 
}
