const express = require('express')
const router = express.Router()
const { auth, restricTo } = require('../Middlewares/auth.middleware')
const userController = require('../Controller/users.controller')

router.post('/', auth, restricTo('admin'), userController.registerNewUser)
router.get('/', auth, restricTo('admin', 'user'), userController.getUsersFirstName)
router.delete('/:id', auth, restricTo('admin'), userController.deleteUserById)
router.patch('/:id', auth, restricTo('admin', 'user'), userController.updateUserById)

router.post('/login', userController.login)
router.post('/refreshtoken',userController.refreshToken )



module.exports = router