const express = require('express')
const app = express()
const authCtrl = require('../controllers/auth')
const passport = require('../config/passport')
const {sameNameAndEmail} = require('../middlewares/verifyEmail')
//route qui permet d'inscrire un utilisateur terminer (valider)
app.post ('/signup',sameNameAndEmail, authCtrl.signup)

// route qui permet de se connecter 
app.post('/login', passport.authenticate("local"), authCtrl.loginUser)


module.exports = app