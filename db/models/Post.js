const mongoose = require('mongoose'),
{ Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    // unique: [true, "Title already exists"],
    required: [true, 'Enter a title'],
    trim:true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      trim:true,
      required:true
  },
  body: {
    type:String,
    required: [true, "body can't be empty"],
    trim:true
  },
}, {timestamps:true});


module.exports = mongoose.model("Post", PostSchema)