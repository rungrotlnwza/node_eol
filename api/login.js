const bcrypt = require("bcrypt");
const pool = require("../config/connect");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "ข้อมูลไม่ถูกต้อง" });
    }

    const [rows] = await pool.query("SELECT * FROM user WHERE m_username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "เข้าสู่ระบบไม่สำเร็จ" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.m_password);

    if (!match) {
      return res.status(401).json({ message: "เข้าสู่ระบบไม่สำเร็จ" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ" });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในระบบ" });
  }
};


// 1. รับ username และ password จาก request body
//    - ต้องใช้ middleware เช่น express.json() เพื่อ parse body
// check

// 2. ตรวจสอบรูปแบบของข้อมูล (Validation)
//    - ตรวจสอบว่า username และ password ไม่ใช่ค่าว่าง, null, undefined
//    - สามารถเพิ่มการ validate ความยาวหรือ pattern ได้
//    - ป้องกัน OWASP A01: Broken Access Control (ถ้ามีการระบุ role ไม่ตรง)
// check

// 3. Sanitize input (แม้จะใช้ prepared statement ก็ทำไว้ก่อน)
//    - ตัด space, escape character, ป้องกัน input แปลก ๆ
//    - ป้องกัน OWASP A03: Injection (SQL Injection)

// 4. ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ prepared statement
//    - เช่น SELECT * FROM users WHERE username = ?
//    - ห้ามใช้ string concat เด็ดขาด
//    - ป้องกัน OWASP A03: Injection

// 5. ตรวจสอบว่าพบผู้ใช้หรือไม่
//    - ถ้าไม่พบ ให้ตอบสถานะ 401 โดยไม่ระบุว่า username หรือ password ผิด
//    - ป้องกัน OWASP A02: Cryptographic Failures (โดยไม่รั่ว logic login)

// 6. ตรวจสอบรหัสผ่านด้วย bcrypt.compare()
//    - เปรียบเทียบ password plain กับ hashed จาก DB
//    - ห้ามเทียบ password ด้วย SQL
//    - ป้องกัน OWASP A02: Cryptographic Failures

// 7. ถ้ารหัสผ่านตรง ให้สร้าง JWT หรือ session token
//    - ระวังอย่าใส่ข้อมูลสำคัญลงไปใน payload (เช่น password หรือสิ่งที่ถอดได้)
//    - ป้องกัน OWASP A07: Identification and Authentication Failures

// 8. ตั้ง cookie เพื่อส่ง token ไปให้ client
//    - ใช้ httpOnly, secure, sameSite=strict เพื่อป้องกัน XSS, CSRF
//    - ป้องกัน OWASP A05: Security Misconfiguration
//    - ป้องกัน OWASP A09: Security Logging and Monitoring Failures (กรณี log token)

// 9. ตรวจสอบ rate limit (เช่นจำกัดจำนวน login ต่อ IP หรือ username)
//    - ป้องกัน brute-force และ credential stuffing
//    - ป้องกัน OWASP A07: Identification and Authentication Failures

// 10. ส่ง response กลับโดยไม่แนบข้อมูลสำคัญ
//     - เช่น ห้ามส่ง password, hashed password หรือ token ออกไปแบบไม่เข้ารหัส
//     - ป้องกัน OWASP A01 + A02
