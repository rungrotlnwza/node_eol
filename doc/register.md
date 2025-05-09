# 📘 API Documentation - Register

## 🔗 Base URL

```
POST http://localhost:3000/api/register
```

---

## 📤 Request Body (JSON)

```json
{
  "username": "username",
  "password": "password",
  "confirm": "password"
}
```

> 📝 **หมายเหตุ**:  
- `username`, `password`, และ `confirm` เป็นข้อมูลที่จำเป็น  
- `password` และ `confirm` ต้องมีค่าเหมือนกัน

---

## 📥 Response

### ✅ 200 OK - สมัครสมาชิกสำเร็จ

```json
{
  "success": "สมัครสมาชิกสำเร็จ"
}
```

---

### ❌ 400 Bad Request - ข้อมูลที่ส่งมาไม่ถูกต้อง

#### 1. กรณีข้อมูลไม่ครบ

```json
{
  "error": "ข้อมูลไม่ครบ"
}
```

- ต้องระบุ `username`, `password`, และ `confirm` ให้ครบถ้วน

#### 2. รหัสผ่านไม่ตรงกัน

```json
{
  "error": "password is not match"
}
```

- `password` และ `confirm` ต้องตรงกัน

#### 3. ชื่อผู้ใช้งานถูกใช้งานแล้ว

```json
{
  "error": "ชื่อผู้ใช้งานถูกใช้งานแล้ว"
}
```

- ต้องใช้ชื่อผู้ใช้ที่ยังไม่ถูกใช้

---

### ❌ 500 Internal Server Error - เซิร์ฟเวอร์มีปัญหา

```json
{
  "error": "เกิดข้อผิดพลาดในเซิร์ฟเวอร์"
}
```

- เกิดข้อผิดพลาดภายในระบบ

---

## ⚠️ หมายเหตุเพิ่มเติม

- ระบบนี้ใช้ **bcrypt** (round: 10) สำหรับการเข้ารหัสรหัสผ่าน  
- ใช้ฐานข้อมูล **MariaDB**

