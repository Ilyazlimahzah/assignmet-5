const app = require('./app')
const connectDB = require('./db/db')

//database connection
connectDB(app)