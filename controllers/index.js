const Auth = require("../models/authModel")
const { validateEmail } = require("../sendMail")
const { findUserService } = require("../service")
const bcrypt = require("bcryptjs")


const handleGetAllUsers = async (req, res) => {

    // const allUser = await Auth.find()  // Find all the users without the service
    const allUser = await findUserService()  //service

    res.status(200).json({
        message: "Successful",
        allUser
    })
}

// handleUserRegistration
const handleUserRegistration = async (req, res)=>{

    try {
        const { email, password, firstName, lastName, state } = req.body
        
        if(!email){
            return res.status(400).json({message: "Please add your email"})
        }

        if(!password){
            return res.status(400).json({message: "Please enter password" })
        }

        const existingUser = await Auth.findOne({ email })

        if(existingUser){
            return res.status(400).json({message: "User account already exist"})
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password should be a min of 6 characters"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new Auth({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            state
        })

        await newUser.save()

        // Send user Email

        res.status(201).json({
            message: "User account created successfully",
            newUser: { email, firstName, lastName, state}
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// To export many endpoints 20:47
module.exports = {
    handleGetAllUsers,
    handleUserRegistration
}