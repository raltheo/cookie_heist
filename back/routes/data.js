const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controllers = require('../controllers/data');

router.get('/data', auth, controllers.getdata)
router.get('/download/:id', auth, controllers.download)
router.get('/key', auth, controllers.getkey)
router.get('/alluser', auth, controllers.getalluserkey)
router.put('/removekey/:id', auth, controllers.removekey)
router.post('/addtime/:id', auth, controllers.addtime)

module.exports = router;