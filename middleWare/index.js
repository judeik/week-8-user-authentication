const jwt = require("jsonwebtoken")
const Auth = require("../models/authModel")

const validateRegister = (req, res) =>{

    const { email, password, firstName, lastName, state } = req.body

    const errors = []

    if(!email){
        errors.push("Please add your email")
    }

    if(!password){
        errors.push("Please add your password")
    }

    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }

      next(); // VERY IMPORTANT
}

// NB: It is not advisable to use authorization but use auth
const authorization = async (req, res, next) => {

    const token = req.header("Authorization")

    
    if(!token){
        return res.status(401).json({message: "Please login!"})
    }
// console.log({token}); 

    const splitToken = token.split(" ")
    // console.log(splitToken);

    const realToken = splitToken[1]
    // console.log(realToken);

    const decoded = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`)
    
    // console.log(decoded);
    if(!decoded){
        return res.status(401).json({message: "Unauthorized Please login"})
    }

    const user = await Auth.findById(decoded.id)

    if(!user){
        return res.status(404).json({message: "User account does not exist"})
    }
    
    if(user?.role !== "admin"){
        return res.status(401).json({message: "Invalid AUTHORIZATION"})
    }
    
    // console.log(user);
    req.user = user

    next()

}

module.exports = {
    validateRegister,
    authorization
}