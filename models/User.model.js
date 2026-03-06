import { Phone } from "lucide-react";
import mongoose, { mongo } from "mongoose";
import { unique } from "next/dist/build/utils";
import { Avatar } from "radix-ui";
import { boolean, date, email, string, trim, url } from "zod";
import { required } from "zod/v4/core/util.cjs";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  role:{
    type: string,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  name: {
    type: string,
    required: true,
    trim: true
  },
   email: {
    type: string,
    required: true,
    trim: true,
    unique: true,
  },
    password: {
    type: string,
    required: true,
    trim: true,
    select: false,
  },
  avatar: {
    url: {
      type: string,
      trim: true
    },
    public_id: {
      type: string,
      trim: true,
    },
  },
  isEmailVerified: {
    type: boolean,
    default: false,
  },
  Phone: {
    type: string,
    trim: true,
  },
  address: {
    type: string,
    trim: true,
  },
  deleteAt: {
    type: date,
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