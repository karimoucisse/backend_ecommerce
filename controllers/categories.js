const Category = require("../models/Category")

// pour admin
exports.createCategory = async (req, res) => {
    const category = await new Category({
        ...req.body
    })

    category.save( (err, category) => {
        if (err) {
            res.status(500).json({error: err})
            return
        }
        res.json(category)
    })
}

exports.getCategory = async (req, res) => {
    
    try {
        const category = await Category.find()
        .populate({
            path: 'products',
            select: 'name image description kiloPrice',
        })
        .exec()
        res.json(category)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

exports.getOneCategory =  async (req, res) => {
    const {sort, filter} = req.query
    let findParams = {}

if (filter) {
    findParams = {
        ...findParams,
        name : {$regex : filter, $options: "i"}
    }
}
    const {id} = req.params
    try {
        const oneCategory = await Category.findById(id)
        .populate({
            path: 'products',
            select: 'name image kiloPrice pricePerPiece',
            match : findParams,
            options: { sort: { 'kiloPrice': sort }}
        })
        .exec()
        res.json(oneCategory)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
    
}