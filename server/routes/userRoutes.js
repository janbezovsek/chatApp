const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers')
const router = express.Router()


//API endpoint for registering a new user
router.route('/').post(registerUser)


//API endpoint for login
router.post('/login',authUser)




module.exports = router