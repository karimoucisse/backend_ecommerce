const Category = require("../models/Category")

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
        .exec()
        res.json(category)
    } catch (err) {
        res.status(500).json({error: err})
    }
}