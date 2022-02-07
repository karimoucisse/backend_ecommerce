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
// middlewar qui permet de connecter l'utilisateur
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
                            select: 'product quantity weight totalPrice'
                        }
                            
                    })
                    .lean()
                    .exec()
                res.json(user)
            }
        })
    }
}
// middleware qui permet de recupérer l'utilisateur connecter
exports.userConnected =  async (req, res) => {
    // console.log(req.user)
    if (req.user) {
        res.json(req.user)
    } else {
        res.status(401).json({ error: "Unauthorized"})
    }
}
exports.userLogout = async (req, res) => {
    req.session.destroy()
    req.logout() 
    res.status(200).json({ success: "Sucess" })
}
