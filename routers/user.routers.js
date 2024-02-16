const express = require ('express')
const router = express.Router()
const userController = require ('../controllers/user.controller')
const authentification = require ('../middleware/authentification')

router.post('/register', userController.createUser)
router.post('/login', authentification, userController.loginUser)  
router.get('/users', userController.getAllUsers)

module.exports = router;