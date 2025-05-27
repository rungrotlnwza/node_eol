const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'mariadb',
  user: 'root',
  password: 'iflovethenus',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10
})

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function waitForDb(retry = 5) {
  for (let i = 0; i < retry; i++) {
    try {
      const conn = await pool.getConnection()
      console.log('✅ Database connected!')
      conn.release()
      return
    } catch (err) {
      console.error(`❌ Attempt ${i + 1} failed:`, err.message)
      await sleep(3000) // <-- นี่แหละที่ทำให้ "รอจริง"
    }
  }

  console.error('❌ Giving up after', retry, 'attempts.')
  process.exit(1)
}

waitForDb()

module.exports = pool
