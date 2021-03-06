const Invoice = require('../models/Invoice')

// middlewar qui renvoie toutes les facture de la data base
exports.getAllInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.find()
        .populate({
            path: 'paymentMethod',
            select: 'cardNumber name'
        })
        .populate({
            path: 'order',
            select: 'deliveryDate createdAt lineItems',
            populate: {
                path : 'lineItems',
                select: 'product quantity weight totalPrice'
            }
        })
        .exec()
        res.json(invoice);
    } catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
}
// middlewar qui crée les facture en data base
exports.createInvoice =  async (req, res) => {
    try {
        const invoice = new Invoice({
            ...req.body
        })
        invoice.save(async (err, invoice) =>{
            if (invoice) {
                res.json(invoice)
                return
            }
            console.log(err)
            res.status(500).json({error: err})
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
}