const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./models/authModel");
const { handleGetAllUsers, handleUserRegistration, handleLogin, handleForgotPassword, handleResetPassword } = require("./controllers/index");
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

app

app.post("/forgot-password", handleForgotPassword)

app.patch("/reset-password", authorization, handleResetPassword)

// MVC => Model View  Controllers, Routes

// Middlewares / Authorization / Validations

// Deploy

// Controller

// A middleware is a function that runs in the middle to the point where your application handles the backend to the points where it handles the APIs is where the middleware is. It is used for validations, you don't want to overload your controllers. You use the middleware for authorization. The middleware is seen as a gateman that check you before allowing you in. 

// Authorization using middleware

app.get("/all-users", authorization, handleGetAllUsers)