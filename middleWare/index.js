const jwt = require("jsonwebtoken")

const validateRegister = (req, res) =>{

    const { email, password, firstName, lastname, state } = req.body

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
const authorization = (req, res, next) => {

    const token = req.header("Authorization")

    
    if(!token){
        return res.status(401).json({message: "Please login!"})
    }
// console.log({token}); 1:10

    const splitToken = token.split(" ")
    console.log(splitToken);

    const realToken = splitToken[1]
    console.log(realToken);

    const decoded = jwt.verify(realToken, $(process.env.ACCESS_TOKEN))

    console.log(realToken);

}

module.exports = {
    validateRegister,
    authorization
}