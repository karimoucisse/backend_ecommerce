const express = require('express')
const app = express()
const authCtrl = require('../controllers/auth')

//route qui permet d'inscrire un utilisateur terminer (valider)
app.post ('/signup', authCtrl.singupUser)



module.exports = app