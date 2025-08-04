const usersModel = require('../Model/users.model')


exports.registerNewUser = async (req, res) => {

let newUser = req.body

  try {
    const user = await usersModel.create(newUser)
    res.status(201).json({ message: "registered user successfully", data: user })
  } catch (error) {
    const messages = Object.values(error.errors).map(e => e.message);
    console.log(messages);
    res.status(400).json({ message: "registering user failed" })
  }
}


exports.getUsersFirstName = async (req, res) => {
  let users = await usersModel.find({},{ firstName: 1})
  res.status(200).json({message:"Success", data: users})

}


exports.deleteUserById = async (req, res) => {

  let userId = req.params.id
  try {
    const deletedUser = await usersModel.findByIdAndDelete(userId)
    if (!deletedUser) return res.status(404).json({ message: "user id not found" })
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
    if (!updatedUser) return res.status(404).json({ message: "user id not found" })
    res.status(201).json({ message: "Updated user successfully", data: updatedUser })
  } catch (error) {
    const messages = Object.values(error.errors).map(e => e.message);
    console.log(messages);
    res.status(400).json({ message: "Updating user failed" })
  }
}