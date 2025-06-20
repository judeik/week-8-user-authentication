const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./models/authModel");
const { handleGetAllUsers, handleUserRegistration } = require("./controllers/index");
const { validateRegister, authorization } = require("./middleWare");

// const Auth = require("./authModel");
// const cors = require("cors")
// const routes = require("./Routes")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json()); // Parse JSON body

// Connecting to MongoDB

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB is connected!");

     // Server Listening
    app.listen(PORT, ()=>{
        console.log(`Server running on ${PORT}`);
    })
})

app.get("/", (req, res)=>{
  res.status(200).json({message: "Welcome to Divine Heritage Computer Server"})
})

// validateRegister is a middleware
app.post("/sign-up", validateRegister, handleUserRegistration);

app.post("/login", async (req, res)=>{
    const { email, password } = req.body

    const user = await Auth.findOne({ email })
    //.select("-password")

    if(!user){
        return res.status(400).json({message: "User account does not exist."})
    }

    const isMatch = await bcrypt.compare(password, user?.password)

    // When password did not match
    if(!isMatch){
        return res.status(400).json({message: "Incorrect email or password."})
    }

    // if(!user.verified){

    // }


    //  Generate a token 
    const accessToken = jwt.sign(  // User signature
        { id: user?._id }, // If you are sure the user have an ID
        process.env.ACCESS_TOKEN,
        {expiresIn: "5m"}  //41
    )

    const refreshToken = jwt.sign(
        { id: user?._id },
        process.env.REFRESH_TOKEN,
        {expiresIn: "30d"}
    )

    res.status(200).json({
        message: "Login Successful",
        accessToken,
        user: {
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            state: user?.state
        },
        refreshToken
    })
})

app.post("/forgot-password", async (req, res) => {

})

app.patch("/reset-password", async (req, res) => {

})

// MVC => Model View  Controllers, Routes

// Middlewares / Authorization / Validations

// Deploy

// Controller

// A middleware is a function that runs in the middle to the point where your application handles the backend to the points where it handles the APIs is where the middleware is. It is used for validations, you don't want to overload your controllers. You use the middleware for authorization. The middleware is seen as a gateman that check you before allowing you in. 

// Authorization using middleware

app.get("/all-users", authorization, handleGetAllUsers)