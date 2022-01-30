const express = require('express')
const app = express()
const userCtrl = require('../controllers/user')


// route pour voir tous les users en base de donnée (valider)
app.get('/', userCtrl.getUsers)
// route qui renvoie un seul utilisateur grace a son id (valider)
app.get('/:id', userCtrl.getOneUser)
// route pour modifier les info de l'utilisateur grace a son id(valider)
app.put('/:id', userCtrl.modifyUser)

module.exports = app