const mongoose = require('mongoose')

const todosSchema = mongoose.Schema({
  userId: {
     type: mongoose.SchemaTypes.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true,
    minlength: [3, "title must be 3 charcters or more."],
    maxLength: [50, "title must be less than or equal 50 characters."]
  },
  status: {
    type: String,
    enum: ['new', 'in progress', 'done'],
    default: 'new'
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now
  // }
},{timestamps: true})

const todosModel = mongoose.model('todos', todosSchema)
module.exports = todosModel