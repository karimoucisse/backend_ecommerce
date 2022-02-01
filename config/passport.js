const passport = require("passport")
const passportLocal = require("passport-local")
let Users = require('../models/User')
const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (username, password, done) => {
    console.log("je suis dans ma strategy local");
    console.log(username)
    console.log(password)
    // on cherche l'utilisateur 
    const user = await Users.findOne({ email: username, password: password })
    .populate({ 
        path: 'orders',
        select: 'lineItems',
        // populate: {
            //     path: 'lineItems',
            //     select: 'quantity'
            // }
            
        })
        // .populate({ path: 'cart'})
        // .populate({ path: 'paymentMethods'})
        .lean()
        .exec()
    // si je ne trouve pas d'utilisateur me renvoi pas autoriser sur postman
    if (!user) {
        return done(null, false)
    }
    // si il le trouve il met l'utilisateur dans req.user
    return done(null, user) 
}))

// cette function renvoi l'utilisateur
passport.serializeUser((user, done) => {
    done(null, user._id)
})
// permet de savoir si c'est le bonne utilisateur grace a l'id
passport.deserializeUser(async (id, done) => {
    const user = await Users.findOne({ _id: id})
        // .populate({ path: 'orders'})
        // .populate({ path: 'following'})
        // .populate({ path: 'tweets'})
        .lean()
        .exec()

    done(null, user)
})

module.exports = passport