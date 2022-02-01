// middleware qui autorise admin a modifier les produit et en rajouter etc...
const verifyAdmin = (req, res, next) =>{
    console.log(req.user,"mon req user du verifyadmin");
    if (req.user.role === "admin") {
        next()
    } else {
        res.status(404).json({error: "Unauthorized"})
    }
}

module.exports = {
    verifyAdmin
}
