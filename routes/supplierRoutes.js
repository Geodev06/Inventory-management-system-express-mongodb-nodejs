const { Router } = require("express")
// supplier controller
const SupplierController = require('../controllers/supplierController')

const { auth } = require('../middleware/auth')

let router = Router()
//supplier
router.get('/create', auth, SupplierController.create)
router.get('/edit/:id', auth, SupplierController.edit)
router.post('/store', auth, SupplierController.store)
router.post('/update/:id', auth, SupplierController.update)

module.exports = router