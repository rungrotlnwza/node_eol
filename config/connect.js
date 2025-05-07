const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10
})

// เช็คการเชื่อมต่อจริงๆ แบบนี้แทน
pool.getConnection()
  .then((conn) => {
    console.log('✅ Database connected!')
    conn.release()
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err)
  })

module.exports = pool