// import { Phone } from "lucide-react";
// import mongoose, { mongo } from "mongoose";
// import { unique } from "next/dist/build/utils";
// import { Avatar } from "radix-ui";
// import { boolean, date, email, string, trim, url } from "zod";
// import { required } from "zod/v4/core/util.cjs";
import bcrypt from 'bcryptjs'
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  role:{
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
   email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
    password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  avatar: {
    url: {
      type: String,
      trim: true
    },
    public_id: {
      type: String,
      trim: true,
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  Phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  deleteAt: {
    type: Date,
    default: null,
    index: true,
  },
}, {timestamps: true} )


userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next();
})

userSchema.methods = {
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password)
  }
}

const UserModel = mongoose.models.User || mongoose.model('user', userSchema, 'users')
export default UserModel