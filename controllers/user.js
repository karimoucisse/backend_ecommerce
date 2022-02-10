const Users = require('../models/User')
// middlewar qui renvoie tous les user de la base de donée
exports.getUsers =  async (req, res, next) => {
    try {
        const users = await Users.find()
        .populate({
            path: 'orders',
            select : 'lineItems invoice'
        })
        .populate({
            path: 'paymentMethods',
            select: 'cardNumber name',
        })
        .exec()
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
}
// renvoie un seul user par rapport a l'id
exports.getOneUser =  async (req, res, next) =>{
    const {id} = req.params
    try {
        const user = await Users.findById(id)
            .populate({
                path: 'orders',
                populate: {
                    path: 'lineItems'
                }
            })
            .exec()
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
}
// permet de modifier l'utilisateur
exports.modifyUser =  async (req, res) => {
    const {id} = req.params
    try {
        const user = await Users.findOneAndUpdate(
            {_id : id},
            {...req.body},
            {new: true}
        ).exec()
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
}