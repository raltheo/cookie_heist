const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controllers = require('../controllers/user');

router.get('/user', auth, controllers.getuser)
router.get('/allfile', auth, controllers.getallfile)

module.exports = router;