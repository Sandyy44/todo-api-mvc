const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
  role: {
    type: String,
    enum: ['user','admin'],
    default: 'user'
  },
  refreshToken:{
    type: String
  }
  ,
  dob: {
    type: Date

  }}, { timestamps: true })

usersSchema.pre('save', async function () {
  let salt = await bcrypt.genSalt(10)
  let hash = await bcrypt.hash(this.password, salt)
  this.password = hash

})

const usersModel = mongoose.model('users', usersSchema)
module.exports = usersModel