const { Router } = require("express")

const UserController = require('../controllers/userController')
const AuthController = require('../controllers/authController')
const { auth, checkUser } = require('../middleware/auth')

const router = Router()


// showing login && register
router.get('*', checkUser)
router.get('/', UserController.login)
router.get('/register', UserController.register)
router.get('/dashboard', auth, UserController.dashboard)
router.get('/logout', UserController.logout)

// request
router.post('/register', AuthController.store)

module.exports = router