const validateRegister = () =>{

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
}

module.exports = {
    validateRegister
}