const { Schema, model} = require("mongoose")

const CategorySchema = Schema( 
    {
        name : {
            type: String,
            required: true
        },
        image : {
            type: String,
            required: true
        },
        products: [{
            type: Schema.Types.ObjectId, ref: "Product"
        }]
    }, {
        timestamps: true
    }
)

CategorySchema.post('findOneAndDelete', async function(category) {
    await model('Product').updateMany(
        {_id: {$in: category.products}},
        { $pull: { categories: category._id}}
    )
})

const Category = model("Category", CategorySchema)
module.exports = Category