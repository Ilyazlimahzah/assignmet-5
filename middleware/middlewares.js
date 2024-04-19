const jwt = require("jsonwebtoken");
const PostModel = require('../db/models/Post')
const config = require('./../config/config')

const verifyPostOwner = async (req, res, next) => {
const postId = req.params.id
const post = await PostModel.findById(postId).populate("author_id")
if(!post){
  return res.status(404).json({message:"no post found"})
}
// const user_id = req.user.id
if(req.user.id !== post.author_id.id){
  return res.status(401).json({message:"You are unauthorized to make changes to this blog"})
}else{
  next()
}
};

const tokenVerification = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Add the decoded user information to the request object
    req.user = decoded;
    next();
  });
  };

const errorMiddleware = (error, req,res, next) => {

}

module.exports = {
verifyPostOwner,
tokenVerification
// checkBody,
};