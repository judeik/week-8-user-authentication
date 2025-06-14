const express = require("express")
const dotenv = require("dotenv");
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
dotenv.config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./authModel");

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB is connected!");

     // Server Listening
    app.listen(PORT, ()=>{
        console.log(`Server running on ${PORT}`);
    })
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`)
// })