const express = require('express')
const app = express()
const port = 3000
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',require('./routes/api'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// install express using npm
// install nodemon using npm
// install mysql2 using npm
// install bcrypt using npm
// install jsonwebtoken using npm