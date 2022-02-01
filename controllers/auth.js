const User = require('../models/User')
const bcrypt = require('bcrypt')

// middleware qui crée un utilisateur 
exports.signup =  async (req, res) => {
    console.log(req.body)
    try {
        const hash = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            ...req.body,
            password:hash
        })
        user.save((err, user) => {
            if (user) {
                // user = user.populate()
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

exports.loginUser =  (req, res) => {
    console.log("la reponse de la route login")
    console.log("le req.user quon recup dans la route login",req.user);
        if (req.user) {
            req.logIn(req.user, async err => {
                if(err) {
                    console.log(err)
                } else {
                    const user = await User.findOne({_id: req.user._id})
                        .populate({ 
                            path: 'orders',
                            select: 'lineItems',
                            populate: {
                                path: 'lineItems',
                                select: 'quantity'
                            }
                                
                        })
                        .lean()
                        .exec()
                    res.json(user)
                }
            })
        }
}
