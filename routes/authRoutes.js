const { Router } = require("express")

const UserController = require('../controllers/userController')
const AuthController = require('../controllers/authController')

// supplier controller
const SupplierController = require('../controllers/supplierController')

const { auth, checkUser } = require('../middleware/auth')

const router = Router()


// showing login && register
router.get('*', checkUser)
router.get('/', UserController.login)
router.get('/register', UserController.register)
router.get('/dashboard', auth, UserController.dashboard)
router.get('/inventory', auth, UserController.inventory)
router.get('/customer', auth, UserController.customer)
router.get('/product', auth, UserController.product)
router.get('/order', auth, UserController.order)
router.get('/logout', UserController.logout)

// user authentication
router.post('/register', AuthController.store)
router.post('/login', AuthController.auth)


module.exports = router