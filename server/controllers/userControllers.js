const asyncHandler = require('express-async-handler')
const generateToken = require("../configuration/generateToken")
const User = require('../models/userModel')


//controller for register 
const registerUser = asyncHandler(async (req,res)=>{

//destructuring this variables from User model
const { name, email, password, pic } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please enter all of the fields")
    }

    //email must be unique
    const userExists = await User.findOne({email})

        if(userExists) {
            res.status(400)
            throw new Error("User already exists")
        }

        //if user doesnt exist we create a new user
        const user = await User.create({
            name,
            email,
            password,
            pic
        })

        
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),

            })
        } else {
            res.status(400)
            throw new Error("Failed to create the user")
        }

})




const authUser = asyncHandler(async (req,res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    //user must exist and password must match
        if(user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            })
        } else {
            res.status(401)
            throw new Error("Invalid email or password")
        }

})




module.exports={registerUser, authUser}