const PostModel = require('../db/models/Post')
const UserModel = require('../db/models/Users');



//Read
exports.getBlogs = async (req,res,next) => {
  const { 
      title,
      sort_by = 'createdAt', 
      sort,
      page = 0, 
      blogsPerPage = 20
  } = req.query;

  const findQuery = {};
  if(title){
    findQuery.title = {$regex:title, $options:"i"}
  }

  const sortQuery = {};

  const sortAttributes = sort_by.split(',')

  for (const attribute of sortAttributes) {
      if (sort === 'asc' && sort_by) {
          sortQuery[attribute] = 1
      }
  
      if (sort === 'desc' && sort_by) {
          sortQuery[attribute] = -1
      }
  }

    const blog = await PostModel
    .find(findQuery)
    .sort(sortQuery)
    .skip(page * blogsPerPage)
    .limit(blogsPerPage);
    
    return res.status(200).json({message:"Got blogs", blog})

}
//Read with ID
exports.getBlog = async (req,res,next) => {
  // const id = req.params.id
  
  try{
    const id = req.params.id
    const blog = await PostModel.findById(id).populate('user')

    if(!blog){
      return res.status(404).json({message:'no blog with specified id found'})
    }
  res.status(200).json({message:"Got Post", blog})
  }catch(err){
    next(err)
  }
  
}

//Read Logged In User Blogs
exports.getMyBlog  = async (req,res,next) =>{
  const { 
    state,
    page = 0, 
    blogsPerPage = 20
} = req.query;


const findQuery = {};
findQuery.author_id = req.user.id;
if(state){
  findQuery.state = {$regex:state, $options:"i"}
}
  
  try{
    const blog = await PostModel
    .find(findQuery)
    .skip(page * blogsPerPage)
    .limit(blogsPerPage);
    if(!blog){
      return res.status(404).json({message:'You have not posted any blog'})
    }
    return res.status(200).json({message:"Got blogs", blog})

  }catch(error){
    next(error)
  }
  
}

//Create
exports.postBlog = async (req,res,next) => {
  const {title, body} = req.body
  const author_id = req.user.id
  //gets author details
  const user = await UserModel.findById(author_id)
    if(!user) {
      return res.status(401).json({message:"User is not authorized"})
    }

    try{
      const blog = await (await PostModel.create({title,body, user:author_id})).populate('user')
      res.status(201).json({message:"Created blog", blog})
    }
    catch(err){
      if (err.code === 11000) {
        next({
        status:400,
          message:"Blog Title already taken"
        });
      }
      else{
        next(err)
      }
    }
}

//Update
exports.updateBlog = async (req,res,next) => {
  const blogId = req.params.id
  const {title, body} = req.body

  try{
    const blog = await PostModel.findByIdAndUpdate(blogId, {title, body}, { new: true}).populate('user')

    res.status(201).json({message:"Blog updated", blog})
  }catch(err){
    next(err)
  }
  
}
//Delete Blog
exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id
  try{
    const deletedBlog = await PostModel.deleteOne({ _id: blogId})
    res.status(201).json({message:"Post deleted", deletedBlog})
  }catch(err){
    next(err)
  }
}
