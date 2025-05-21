# 🛠️ Login API - วิธีใช้งานและรายงานการทำงาน

## 📌 วิธีใช้งาน API

### ➤ Method: `POST`
### ➤ URL: `/api/login`
### ➤ Content-Type: `application/json`

### 📥 Request Body:
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

### 📤 Response (เมื่อสำเร็จ):
```json
{
  "message": "เข้าสู่ระบบสำเร็จ"
}
```

### 🍪 Cookie ที่ถูกส่งกลับ:
- ชื่อ: `token`
- Type: `httpOnly`
- อายุ: 1 ชั่วโมง
- ใช้ยืนยันตัวตนในการเรียก API อื่น ๆ

---

## 📄 รายงานการทำงานของ API

### 1. จุดประสงค์
API นี้ใช้สำหรับตรวจสอบชื่อผู้ใช้และรหัสผ่าน หากถูกต้อง จะสร้าง JWT token และส่งคืนผ่าน cookie เพื่อให้ client ยืนยันตัวตนในการเรียกใช้งาน API อื่น ๆ

---

### 2. ข้อมูลที่รับ
รับค่าจาก client ในรูปแบบ JSON:
- `username`: ชื่อผู้ใช้
- `password`: รหัสผ่าน (plaintext)

---

### 3. ลำดับการทำงานของ API

#### ✅ ขั้นที่ 1: ตรวจสอบข้อมูลเบื้องต้น
- ตรวจสอบว่ามีการส่ง `username` และ `password` มาหรือไม่
- หากไม่มี จะคืน HTTP 400 `"ข้อมูลไม่ถูกต้อง"`

#### ✅ ขั้นที่ 2: Query ข้อมูลผู้ใช้จากฐานข้อมูล
- ใช้ prepared statement เพื่อป้องกัน SQL Injection:
```sql
SELECT * FROM user WHERE m_username = ?
```
- หากไม่พบผู้ใช้ → คืน HTTP 401 `"เข้าสู่ระบบไม่สำเร็จ"`

#### ✅ ขั้นที่ 3: ตรวจสอบรหัสผ่าน
- ใช้ `bcrypt.compare()` เพื่อเทียบรหัสผ่านกับ hash (`m_password`)
- หากไม่ตรง → คืน HTTP 401

#### ✅ ขั้นที่ 4: สร้าง JWT Token
- สร้าง token โดยมีข้อมูล:
  - `id`: ไอดีผู้ใช้
  - `username`: ชื่อผู้ใช้
- ตั้งอายุ token: 1 ชั่วโมง

#### ✅ ขั้นที่ 5: ส่ง token ผ่าน httpOnly cookie
- ป้องกัน XSS/CSRF โดยใช้:
  - `httpOnly: true`
  - `sameSite: strict`
  - `secure: true` (เฉพาะ production)
- คืน HTTP 200 และข้อความ `"เข้าสู่ระบบสำเร็จ"`

---

### 4. ข้อดีและความปลอดภัย

| ด้าน | แนวทางที่ใช้ |
|------|---------------|
| SQL Injection | ใช้ `?` parameter ใน query |
| Password Security | `bcrypt` hash + compare |
| Token Security | JWT + `httpOnly` cookie |
| CSRF/XSS | `sameSite`, `secure`, `httpOnly` |
| Error Handling | `try-catch` ครอบทุกส่วน |
| Data Leak Prevention | ไม่ส่ง password กลับไป |

---

### 5. การป้องกัน OWASP Top 10

API นี้ออกแบบโดยคำนึงถึงความปลอดภัยตามแนวทาง **OWASP Top 10 (2021)** โดยเฉพาะ:

| รหัส | รายละเอียดช่องโหว่ | วิธีป้องกันใน API นี้ |
|------|----------------------|-------------------------|
| **A01: Broken Access Control** | ความล้มเหลวในการควบคุมสิทธิ์ | ไม่เปิดเผยรายละเอียด user / auth logic |
| **A02: Cryptographic Failures** | การจัดการข้อมูลลับผิดพลาด | ใช้ `bcrypt` ในการจัดการ password และ JWT ที่มีการลงลายเซ็น |
| **A03: Injection** | SQL injection หรือ code injection | ใช้ `prepared statement` และไม่เชื่อม query ด้วย string |
| **A05: Security Misconfiguration** | ตั้งค่าระบบผิด เช่นเปิด cookie ไม่ปลอดภัย | ใช้ cookie flag เช่น `httpOnly`, `sameSite`, `secure` |
| **A07: Identification and Authentication Failures** | ตรวจสอบตัวตนผิดพลาด เช่น logic login ไม่ปลอดภัย | ใช้ JWT + ตรวจ username/password แบบเข้มงวด |
| **A09: Security Logging and Monitoring Failures** | ขาดการจับ log หรือจับผิดเมื่อมีพฤติกรรมผิดปกติ | ใช้ `try-catch` เพื่อ log error และไม่เปิดเผยข้อมูลภายใน |

---

### 6. หมายเหตุ

- ห้าม trim หรือ sanitize password
- สามารถ trim username ก่อน query ได้เพื่อป้องกัน logic bypass
- JWT ที่ส่งกลับควรใช้ร่วมกับ middleware ตรวจ token ก่อนเข้าถึง endpoint อื่น ๆ
- API นี้ปลอดภัยในระดับที่สามารถใช้งานจริงในระบบ production ได้
