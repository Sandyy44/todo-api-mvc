const express = require('express')
const router = express.Router()

const todoController = require('../Controller/todos.controller')

router.post('/', todoController.createNewTodo)
router.patch('/:id', todoController.updateTodoById)
router.delete('/:id', todoController.deleteTodoById)
router.get('/', todoController.getTodos)

module.exports = router