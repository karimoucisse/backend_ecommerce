const express = require("express")
const app = express()

const categoryCtrl = require("../controllers/categories")


app.get("/", categoryCtrl.getCategory)

app.get("/:id", categoryCtrl.getOneCategory)


app.post("/", categoryCtrl.createCategory)

module.exports = app