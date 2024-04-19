const express = require('express')  


const userRouter = require('./routes/users')
const postRouter = require('./routes/post')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()

 
 
app.use(morgan('dev'))



//Rate Limiting
const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000,
	max: 4,
	standardHeaders: true,
	legacyHeaders: false,
})

//security
app.use(helmet())
//MiddleWares
app.use(express.json());



//routes
app.get('/', (req,res) => {
  res.status(200).json({message:"welcome to Fawaz post"})
})

//limit calls to posts and user
app.use(limiter)

app.use('/user',userRouter )
app.use('/post',postRouter )

// Handle error for unknown route
app.use('*', (req, res) => {
  return res.status(404).json({ message: 'route not found' })
})
//Error-handling middleware
app.use((err, req, res, next) => {
    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})


module.exports = app