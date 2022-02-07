const express = require("express")
const app = express()

const cartCtrl = require("../controllers/carts")

app.get("/", cartCtrl.getCart)

app.get("/:id",cartCtrl.getOneCart)
// route qui crée mon panier
app.post("/", cartCtrl.createCart)

app.delete("/", cartCtrl.deleteCart)

module.exports = app