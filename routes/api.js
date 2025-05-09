
const router = require('express').Router();

router.post('/register', require('../api/register'))
router.post('/login',require('../api/login'))

module.exports = router;