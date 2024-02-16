const express = require ('express')
const router = express.Router()
const userController = require ('../controllers/user.controller')
const authentification = require ('../middleware/authentification')

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)  
router.get('/users', authentification, userController.getAllUsers)

module.exports = router;