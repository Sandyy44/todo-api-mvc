const express = require('express')
const router = express.Router()

const userController = require('../Controller/users.controller')

router.post('/', userController.registerNewUser)
router.get('/', userController.getUsersFirstName)
router.delete('/:id', userController.deleteUserById)
router.patch('/:id', userController.updateUserById)

module.exports = router