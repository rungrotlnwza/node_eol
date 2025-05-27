const bcrypt = require('bcrypt')
const pool = require('../config/connect') // เรียกใช้ pool โดยไม่ต้อง await

module.exports = async (req, res) => {
  const { username, password, confirm } = req.body

  if (!username || !password || !confirm) {
    return res.status(400).json({ error: "Incomplete information" })
  }

  if (password !== confirm) {
    return res.status(400).json({ error: "password is not mate" })
  }

  try {
    // ตรวจสอบ username ซ้ำ
    const [existingUser] = await pool.query(
      "SELECT * FROM user WHERE m_username = ?",
      [username]
    )

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "ชื่อผู้ใช้ถูกใช้งานแล้ว" })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // เพิ่มผู้ใช้ใหม่
    await pool.query(
      "INSERT INTO user (m_username, m_password, m_role) VALUES (?, ?, ?)",
      [username, passwordHash, 'user']
    )

    res.status(201).json({ success: "สมัครสมาชิกสำเร็จ!" })

  } catch (error) {
    console.error("🚨 Error:", error)
    res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" })
  }
}