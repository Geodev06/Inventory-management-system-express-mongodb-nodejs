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
router.get('/release', auth, UserController.release)
// profile
router.get('/profile', auth, UserController.profile)
router.post('/change-password/:id', auth, UserController.changePassword)
// logout
router.get('/logout', UserController.logout)
// chart
router.get('/composistion/get', auth, UserController.getComposition)
router.get('/order/get', auth, UserController.getOrders)

// user authentication
router.post('/register', AuthController.store)
router.post('/login', AuthController.auth)


module.exports = router