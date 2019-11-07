const express = require('express')
const router = express.Router()
const openController = require('../controllers/open')

router.get('/', openController.homePage)
router.get('/about', openController.aboutPage)

router.post('/search', openController.search)

module.exports = router