const bcrypt = require("bcrypt");
const pool = require("../config/connect");
const jwt = require("jsonwebtoken");

module.exports = async(req, res) => {
    try {
        // ✅ 1. รับ input จาก body
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        // ✅ 2. ตรวจสอบว่ามีผู้ใช้นี้ใน DB หรือไม่
        const [rows] = await pool.query(
            "SELECT * FROM user WHERE m_username = ?", [username.trim()]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "เข้าสู่ระบบไม่สำเร็จ" }); // ไม่บอกว่า username หรือ password ผิด
        }

        const user = rows[0];

        // ✅ 3. ตรวจสอบ password
        const isMatch = await bcrypt.compare(password, user.m_password);

        if (!isMatch) {
            return res.status(401).json({ message: "เข้าสู่ระบบไม่สำเร็จ" });
        }

        // ✅ 4. สร้าง JWT (อย่าใส่ข้อมูลอ่อนไหวใน payload เด็ดขาด)
        const token = jwt.sign({ id: user.id, username: user.username },
            process.env.JWT_SECRET || "defaultSecret", { expiresIn: "1h" }
        );

        // ✅ 5. ส่ง token กลับแบบ httpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ถ้า dev ยังไม่ใช่ https ให้ false
            sameSite: "strict", // ป้องกัน CSRF
            maxAge: 3600000, // 1 ชั่วโมง
        });

        // ✅ 6. ส่งข้อความยืนยัน (ไม่ต้องส่ง token)
        return res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ" });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(401).json({ message: "เกิดข้อผิดพลาดภายในระบบ" });
    }
};