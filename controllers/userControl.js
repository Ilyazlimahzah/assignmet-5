const UserModel = require('../db/models/Users')
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// create json web token
const createToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '24h'
  });
};




exports.signup = async (req,res,next) =>{
  const {email, name, password} = req.body
  try{
    const user = await UserModel.create({email, name, password})
    const returnUser = user.toJSON()
    // const token = createToken(user._id)
    res.status(201).json({message: 'Signup successful',data:returnUser})

  }
  catch(err){
    if (err.code === 11000) {
      next({
      status:400,
        message:"Email already exists"
      });
    }
    else{
      next(err)
    }
  }
  
}

exports.signin = async (req,res,next) =>{
  const {email, password} = req.body
  try{
    const user = await UserModel.findOne({email:{$regex:email, $options:"i"}})
    if(!user) {
      return res.status(401).json({message:"email or password is invalid"})
    }
    const validPassword = await user.isValidPassword(password)
    if(!validPassword) {
      return res.status(404).json({message:"email or password is invalid"})
    }
    const token = createToken(user._id)
    const returnUser = user.toJSON()
    res.status(200).json({message: 'Login successful', data:{accessToken:token, user:returnUser}})

  }
  catch(err){
    next(err)
  }
}
