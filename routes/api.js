
const router = require('express').Router();

router.post('/register', require('../api/register'))

module.exports = router;