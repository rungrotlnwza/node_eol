const { Certificate } = require('crypto')
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
app.use(express.json())
app.use(express.static('public'));

const read = {
    key: fs.readFileSync('./key/private.pem'),
    Certificate: fs.readFileSync('./key/public.pem'),
}
app.use('/', require('./routes/web'))
app.use('/api', require('./routes/api'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// install express using npm
// install nodemon using npm
// install mysql2 using npm
// install bcrypt using npm
// install jsonwebtoken using npm