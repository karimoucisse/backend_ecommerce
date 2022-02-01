const express = require('express')
const app = express()
const authCtrl = require('../controllers/auth')
const passport = require('../config/passport')
//route qui permet d'inscrire un utilisateur terminer (valider)
app.post ('/signup', authCtrl.signup)

// route qui permet de se connecter 
app.post('/login', passport.authenticate("local"), (req, res) => {
console.log("la reponse de la route login")
    if (req.user) {
        req.logIn(req.user, err =>{
            if(err) {
                console.log(err)
            } else {
                res.json(req.user)
            }
        })
    }
})


module.exports = app