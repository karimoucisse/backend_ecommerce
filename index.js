require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT
const mongoose = require("mongoose")
// const passport = require("./config/passport")
const cors = require("cors")
const session = require("express-session")



const authRoutes = require("./routes/auth")
const categoriesRoutes = require("./routes/categories")
const productsRoutes = require("./routes/products")
// const lineItemsRoutes = require("./routes/lineItems")
// const cartsRoutes = require("./routes/carts")
// const ordersRoutes = require("./routes/orders")
// const invoicesRoutes = require("./routes/invoices")
// const paymentMethodsRoutes = require("./routes/paymentMethods")
const usersRoutes = require("./routes/users")


mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on("error", err => console.log(err))
db.once("open", () => console.log("Connected to db"))

app.use(express.json())
app.use(cors({
  origin: process.env.ALLOWED_DOMAIN,
  credentials: true
}))
app.use(express.static('public'))

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))

// app.use(passport.initialize())
// app.use(passport.session())

app.use('/auth', authRoutes)
app.use('/categories', categoriesRoutes)
app.use('/products', productsRoutes)
// app.use('/lineItems', lineItemsRoutes)
// app.use('/carts', cartsRoutes)
// app.use('/orders', ordersRoutes)
// app.use('/invoices', invoicesRoutes)
// app.use('/paymentMethods', paymentMethodsRoutes)
app.use('/users', usersRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
}) 