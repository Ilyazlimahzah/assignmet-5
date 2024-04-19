const express = require('express')


const userRouter = express.Router()
const {signup, signin} =require('../controllers/userControl')
const { RegisterValidation, LoginValidation } = require('../middleware/validators/user.validator.js')

userRouter.post('/signup',RegisterValidation, signup )
userRouter.post('/login',LoginValidation, signin )


module.exports = userRouter