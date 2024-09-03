const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers')
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")


//API endpoint for registering a new user
router.route('/').post(registerUser)


//API endpoint for login
router.post('/login',authUser)


//API for searching an user
router.route('/').get(protect, allUsers)




module.exports = router