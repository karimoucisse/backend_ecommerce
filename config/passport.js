const passport = require("passport")
const passportLocal = require("passport-local")
let User = require('../models/User')
const bcrypt = require('bcrypt')
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
    const user = await User.findOne({ email: username})
        .lean()
        .exec()
    // si je ne trouve pas d'utilisateur me renvoi pas autoriser sur postman
    if (!user) {
        return done(null, false)
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    // si le password n'est pas valide, on renvoie une erreur
    if (!passwordValid) {
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
    const user = await User.findOne({ _id: id})
        // .populate({ path: 'orders'})
        // .populate({ path: 'following'})
        // .populate({ path: 'tweets'})
        .lean()
        .exec()

    done(null, user)
})

module.exports = passport