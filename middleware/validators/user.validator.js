const Joi = require('joi');

const UserRegSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required(),
    name: Joi.string()
        .max(20)
        .required()
        .trim(),
    password: Joi.string()
        .required(),
    repeat_password: Joi.ref('password'),
})
.with('password', 'repeat_password');




const UserLoginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .required(),
    password: Joi.string()
        .required(),
})



async function RegisterValidation(req, res, next) {
    const user = req.body

    try {
        await UserRegSchema.validateAsync(user)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

async function LoginValidation(req, res, next) {
    const user = req.body

    try {
        await UserLoginSchema.validateAsync(user)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

module.exports = {
    RegisterValidation,
    LoginValidation
}