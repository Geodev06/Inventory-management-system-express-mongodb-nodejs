const { Router } = require("express")
// supplier controller
const ReleaseController = require('../controllers/releaseController')

const { auth } = require('../middleware/auth')

let router = Router()
//supplier


router.post('/store', auth, ReleaseController.store)
router.get('/show/:id', auth, ReleaseController.show)
router.get('/destroy/:id', auth, ReleaseController.destroy)
router.get('/update/:id', auth, ReleaseController.update)

module.exports = router