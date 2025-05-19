const router = require('express').Router();

router.post('/register', require('../api/register'))
router.post('/signin', require('../api/signin'))


module.exports = router;