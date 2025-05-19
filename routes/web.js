const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
router.get('/signin', (req, res) => {
    // signin คือ การ login
    res.sendFile(path.join(__dirname, ('../public/signin.html')))
});
router.get('/signup', (req, res) => {
    // signup คือ การ register
    res.sendFile(path.join(__dirname, ('../public/signup.html')))
});
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, ('../public/dashboard.html')))
})

module.exports = router;