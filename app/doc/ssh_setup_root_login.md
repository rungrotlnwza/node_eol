
# ติดตั้ง SSH Server และเปิดใช้ root login บน Ubuntu/Debian

## 1. อัปเดตระบบ
```bash
sudo apt update
sudo apt upgrade -y
```

## 2. ติดตั้ง OpenSSH Server
```bash
sudo apt install openssh-server -y
```

## 3. ตรวจสอบสถานะ SSH
```bash
sudo systemctl status ssh
```

ถ้า SSH ยังไม่ทำงาน ให้เริ่มด้วยคำสั่ง:
```bash
sudo systemctl start ssh
```

## 4. ตั้งรหัสผ่านให้ root
```bash
sudo passwd root
```

## 5. แก้ไฟล์ SSH config
เปิดไฟล์:
```bash
sudo nano /etc/ssh/sshd_config
```

แก้หรือเพิ่มบรรทัดต่อไปนี้:

```text
PermitRootLogin yes
PasswordAuthentication yes
```

> กด `Ctrl + O` เพื่อบันทึก และ `Ctrl + X` เพื่อออกจาก nano

## 6. รีสตาร์ต SSH เพื่อให้ config มีผล
```bash
sudo systemctl restart ssh
```

## 7. อนุญาต Firewall ให้ SSH ผ่าน (ถ้าใช้ UFW)
```bash
sudo ufw allow ssh
```

## 8. ทดสอบ SSH Login ด้วย root

เปิด Termius หรือ SSH client แล้วกรอก:
- **Host**: IP address ของเครื่อง
- **Port**: 22
- **Username**: `root`
- **Password**: (รหัสผ่านที่ตั้งไว้)

---

> **หมายเหตุ**: เพื่อความปลอดภัยจริงๆ ไม่ควรเปิด root login ทิ้งไว้ถ้าไม่จำเป็น
