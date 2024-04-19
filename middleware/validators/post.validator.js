const Joi = require('joi');

const PostBlogSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(20)
        .required(),
    body: Joi.string()
        .min(10)
        .required(),
})


const UpdatePost = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(20),
    body: Joi.string()
        .min(10),
})


async function PostBlogValidation(req, res, next) {
    const user = req.body

    try {
        await PostBlogSchema.validateAsync(user)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

async function UpdateBlogValidation(req, res, next) {
    const user = req.body

    try {
        await UpdatePost.validateAsync(user)
        next()
    } catch (error) {
        // console.log(error)
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

module.exports = {
    PostBlogValidation,
    UpdateBlogValidation
}