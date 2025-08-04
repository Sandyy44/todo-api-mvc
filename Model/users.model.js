const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [8, "username must be 8 characters or more."]
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: [3, "first name must be 3 charcters or more."],
    maxLength: [15, "first name must be less than or equal 15 characters."]
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "first name must be 3 charcters or more."],
    maxLength: [15, "first name must be less than or equal 15 characters."]
  },
  dob: {
    type: Date

  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const usersModel = mongoose.model('users', usersSchema)
module.exports = usersModel