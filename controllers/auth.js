const Users = require('../models/User')

exports.signup =  async (req, res) => {
    console.log(req.body)
    try {
        const user = new Users({
            ...req.body
        })
        user.save((err, user) => {
            if (user) {
                res.json(user)
                return
            }
            console.log(err)
            res.status(500).json({ error : err})
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error : err})
    }
}