const { Router } = require("express")
// supplier controller
const OrderController = require('../controllers/orderController')

const { auth } = require('../middleware/auth')

let router = Router()
//supplier

router.get('/edit/:id', auth, OrderController.edit)
router.post('/store', auth, OrderController.store)
router.post('/update/:id', auth, OrderController.update)
router.get('/destroy/:id', auth, OrderController.destroy)

module.exports = router