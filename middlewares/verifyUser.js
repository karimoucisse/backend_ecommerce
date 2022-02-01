// middlware qui verifier si l'utilisateur est connecter pour donné acces a certaine route
const verifyUser = (req, res, next) => {
    console.log(req.user,"mon req user biatch");
    if (!req.user) {
        res.status(404).json({error: "Unauthorized"})
    } else {
        next()
    }
}

module.exports = {
    verifyUser
}