const todosModel = require('../Model/todos.model')

exports.createNewTodo = async (req, res) => {
  let newTodo = req.body
  let userId = req.id
  try {
    newTodo.userId = userId
    let todo = await todosModel.create(newTodo)

    res.status(201).json({ message: "To-Do Created successfully", data: todo })
  } catch (error) {
    const messages = Object.values(error.errors).map(e => e.message);
    console.log(messages);
    res.status(400).json({ message: "Creating To-Do failed" })
  }

}


exports.updateTodoById = async (req, res) => {

  let newTodoData = req.body
  let todoId = req.params.id
  try {
    const updatedTodo = await todosModel.findByIdAndUpdate(todoId, { $set: newTodoData }, { new: true })
    if (!updatedTodo) return res.status(404).json({ message: "To-Do's id not found" })
    res.status(201).json({ message: "To-Do Updated successfully", data: updatedTodo })
  } catch (error) {
    const messages = Object.values(error.errors).map(e => e.message);
    console.log(messages);
    res.status(400).json({ message: "Updating To-Do failed" })
  }

}


exports.deleteTodoById = async (req, res) => {
  let todoId = req.params.id
  try {
    const deletedTodo = await todosModel.findByIdAndDelete(todoId)
    if (!deletedTodo) return res.status(404).json({ message: "To-Do's id not found" })
    res.status(204).json()
  } catch (error) {
    const messages = Object.values(error.errors).map(e => e.message);
    console.log(messages);
    res.status(400).json({ message: "Deleting To-Do failed" })
  }
}


exports.getTodos = async (req, res) => {
  let limit = parseInt(req.query.limit)
  let skip = parseInt(req.query.skip)
  let todos = await todosModel.find().populate('userId')
  try {
    if (isNaN(limit) && isNaN(skip)) {
      //res.status(200).json({ message: "Success", data: todos })
      res.status(200).render('todos',{ message: "Success", todos })
    }
    else {
      let toDoArr = todos
      let filteredTodos = toDoArr.slice(skip, skip + limit)
      res.status(200).json({ message: "Success", data: JSON.stringify(filteredTodos) })
    }
  } catch (error) {
    res.status(400).json("Bad request")
  }

}





