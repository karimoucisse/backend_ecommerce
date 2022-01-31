const express = require("express")
const app = express()

const cartCtrl = require("../controllers/carts")

app.get("/", cartCtrl.getCart)

app.delete("/", cartCtrl.deletCart)

module.exports = app