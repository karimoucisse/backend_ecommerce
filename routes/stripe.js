// This is your test secret API key.
const stripe = require('stripe')('sk_test_51KQpt6Bv9r0udF87LXsdUKbApAoT3Lnu3WMQIkyaLM0IySyPM43i2GlcT2If1uqCB8aMO5IYA7oZfVi2BONbRlDT004g5X2ipW');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:5000';
// post qui permet de généré l'intance de payment
app.post('/', async (req, res) => {
    const {price} = req.body
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: "eur",
    });

    res.json({ clientSecret: paymentIntent.client_secret })
});

module.exports = app