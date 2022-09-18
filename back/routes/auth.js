const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controllers = require('../controllers/auth');
router.post('/signup', controllers.signup)
router.post('/key', auth, controllers.newKey)
router.post('/login', controllers.signin)
router.post('/changepassword', auth, controllers.change)

module.exports = router;