const usersModel = require('../Model/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()
const { promisify } = require('util')

exports.registerNewUser = async (req, res) => {

  let newUser = req.body

  try {
    const user = await usersModel.create(newUser)
    res.status(201).json({ message: "User registered successfully", data: user })
  } catch (error) {
    if (error.name === 'ValidationError') {
      let validationErrors = Object.values(error.errors).map(e => e.message)
      res.status(400).json({ message: "Validation error. Faild to register user", validationErrors })
    } else {
      console.log(error)
      res.status(500).json({ message: "Registering user failed" })
    }
  }
}


exports.getUsers = async (req, res) => {
  let users = await usersModel.find({}/*, { firstName: 1 }*/)
  res.status(200).json({ message: "Success", data: users })

}


exports.deleteUserById = async (req, res) => {

  let userId = req.params.id
  try {
    const deletedUser = await usersModel.findByIdAndDelete(userId)
    if (!deletedUser) return res.status(404).json({ message: "User id not found" })
    res.status(204).json()
  } catch (error) {
    const messages = Object.values(error.errors).map(e => e.message);
    console.log(messages);
    res.status(400).json({ message: "Deleting user failed" })
  }
}


exports.updateUserById = async (req, res) => {

  let newUserData = req.body
  let userId = req.params.id


  try {
    const updatedUser = await usersModel.findByIdAndUpdate(userId, { $set: newUserData }, { new: true })
    if (!updatedUser) return res.status(404).json({ message: "User id not found" })
    res.status(201).json({ message: "User updated successfully", data: updatedUser })
  } catch (error) {
    const messages = Object.values(error.errors).map(e => e.message);
    console.log(messages);
    res.status(400).json({ message: "Updating user failed" })
  }
}

exports.login = async (req, res) => {
  let { username, password } = req.body
  if (!username || !password) return res.status(400).json({ message: "Please enter username & password" })
  let user = await usersModel.findOne({ username })
  if (!user) return res.status(404).json({ message: "Wrong username or password" })

  try {
    let flag = await bcrypt.compare(password, user.password)
    if (!flag) return res.status(404).json({ message: "Wrong username or password" })
    let token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.TOKEN_PRIVATE_KEY, { expiresIn: '10s' })

    let refreshToken = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: '14d' })

    const updatedUser = await usersModel.findByIdAndUpdate(user._id, { $set: { refreshToken } }, { new: true })
    res.status(200).json({ message: "Welcome!",  updatedUser, token, refreshToken  })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Login failed" })
  }
}

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    let payload = await promisify(jwt.verify)(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY)
    if (!payload) return res.status(401).json({ message: "unauthorized" })

    let user = await usersModel.findOne({ _id: payload.id })
    if (!user) return res.status(401).json({ message: "unauthorized" })//invalid token
    let token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.TOKEN_PRIVATE_KEY, { expiresIn: '1h' })
    res.status(200).json({ token })


  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: "forbidden" })
  }
}