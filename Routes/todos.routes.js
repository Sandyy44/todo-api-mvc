const express = require('express')
const router = express.Router()
const { auth, restricTo } = require('../Middlewares/auth.middleware')
const todoController = require('../Controller/todos.controller')

router.post('/',auth, restricTo('admin','user'), todoController.createNewTodo)
router.patch('/:id',auth, restricTo('admin', 'user'), todoController.updateTodoById)
router.delete('/:id',auth, restricTo('admin', 'user'), todoController.deleteTodoById)
router.get('/',auth, restricTo('admin', 'user'), todoController.getTodos)

module.exports = router