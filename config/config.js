require('dotenv').config()

const config = {
    MONGO_URL:process.env.MONGO_URL,
    PORT:process.env.PORT,
    JWT_SECRET:process.env.JWT_SECRET,
    DB_LOCAL:process.env.DB_LOCAL
}

module.exports = config