const mongoose = require('mongoose')
const config = require('../config/config')

// database connection
module.exports = function connect (app){
  const dbURI = config.MONGO_URL || config.DB_LOCAL;
  const PORT = config.PORT
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, dbName:"BlogApp" })
  .then((result) => app.listen(PORT, ()=>{
    console.log(`App running at PORT: ${PORT} and MongoDB Server started`)
  }))
  .catch((err) => console.log(err));
}
