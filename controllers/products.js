const Products = require('../models/Product')
// middlewar qui renvoie tous les produits (user et admin)
exports.getProducts =  async (req, res) => {
    const {sort, filter, categories} = req.query
    console.log(req.query)
    let findParams = {}
    
    if (filter) {
        findParams = {
            ...findParams,
            name : {$regex : filter, $options: "i"}
        }
    }
    if (categories) {
        findParams = {
            ...findParams,
            categories : { $in : categories.split(",") }
        }
    }
    // if (category) {categories : {$regex}}
    try {
            const products = await Products.find(findParams)
            .sort({kiloPrice : sort})
            .populate({
                path: 'categories',
                select: 'name'
            })
            .exec()
            res.json(products) 
        } catch (err) {
        console.log(err)
        res.status(500).json({error : err})
    }
}
// middlewar pour renvoi un produit par rapport a l'id (user)
exports.getOneProduct =  async (req, res) => {
    const {id} = req.params
    try {
        const oneProduct = await Products.findById(id)
        .populate({
            path: 'categories',
            select: 'name'
        })
        .exec()
        res.json(oneProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
    
}
// permet de crée un produit reserver a l'admin 
exports.createProductAdmin =  async (req, res) => {
    try {
        const product = new Products({
            ...req.body
        })
        product.save( async (err, product) => {
            if (product) {
                res.json(product)
                return
            }
            console.log(err)
            res.status(500).json({ error: err })
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}
// permet de modifier un produit par rapport a son id (admin)
exports.modifyOneProduitAdmin =  async (req, res) => {
    const {id} =req.params
    try {
        const product = await Products.findOneAndUpdate(
            {_id : id},
            {...req.body},
            {new : true}
        ).exec()
        res.json(product)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
}