const Users = require('../models/User')

exports.getUsers =  async (req, res, next) => {
    try {
        const users = await Users.find()
        // .populate()
        .exec()
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
}

exports.getOneUser =  async (req, res, next) =>{
    const {id} = req.params
    try {
        const user = await Users.findById(id).exec()
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
}

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