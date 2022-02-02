const { Schema, model} = require("mongoose")

const ProductSchema = Schema(
    {
      name : {
          type: String,
          required: true
      },
      image : {
          type: String,
          required: true
      },
      characteristic : {
          type: String,
          required: true
      },
      kiloPrice : {
          type: Number,
          required: true
      },
      pricePerPiece : {
          type: Number,
          required: true
      },
      netWeight: {
          type: Number,
          required: true
      },
      fishingArea : {
        type: String,
        required: true
      },
      conditioning: {
          type: String,
          required: true
      },
      available : {
          type: Boolean,
          default: false
      },
      categories : [{
        type: Schema.Types.ObjectId, ref: "Category"
    }]
    }, {
        timestamps: true
    }
)

ProductSchema.post('save', async function(product) {
    await model('Category').updateMany(
        {_id: {$in: product.categories}},
        {$push: {products: product._id}}
    )
})

const Product = model("Product", ProductSchema)
module.exports = Product