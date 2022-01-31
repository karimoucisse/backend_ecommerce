const { Schema, model } = require("mongoose")


const UserSchema = Schema({
    role : { type : String },
    firstName :{ type : String , required : true},
    name : { type : String , required : true },
    birthDate: { type : Date },
    email : { type : String, required : true},
    password : { type : String, required : true, minlength: 6 },
    phoneNumber : { type : String },
    adress : { type : String, required : true}, 
    orders : [{ type : Schema.Types.ObjectId, ref : "Order" }],
    cart : { type : Schema.Types.ObjectId, ref : "Cart" }, 
    paymentMethods : [{ type : Schema.Types.ObjectId, ref : "PaymentMethod"}],
}, {
    timestamps : true
})

const User = model('User', UserSchema)

module.exports = User