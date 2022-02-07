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
            select: 'name image description kiloPrice'
        })
        .exec()
        res.json(category)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

exports.getOneCategory =  async (req, res) => {
    const {id} = req.params
    try {
        const oneCategory = await Category.findById(id)
        .populate({
            path: 'products',
            select: 'name image kiloPrice pricePerPiece'
        })
        .exec()
        res.json(oneCategory)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
    
}