const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const { isEmail } = require('validator')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exists"],
    validate: [isEmail, 'incorrect email'],
    required: [true, 'Enter an email'],
    trim:true
  },
  name: {
    type: String,
    required: [true, 'Enter your name'],
    trim:true
  },

  password: {
    type:String,
    required: [true, "enter password"]
  },

},{timestamps:true});

UserSchema.pre(
  'save',
  async function (next) {
      const user = this
      // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
          const  salt = await bcrypt.genSalt(),
            hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

UserSchema.options.toJSON = {
  transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
  }
};

module.exports = mongoose.model("User", UserSchema)