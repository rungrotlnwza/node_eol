export async function Click_Register(event) {
    // ต้องเพิ่ม async ตรงนี้
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm_password").value;
    let data = { username, password, confirm };
    if (!username || !password || !confirm) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน"); // ควรแจ้งผู้ใช้แทนการ console.log
        return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
    }
    // console.log(data)
    try {
        const response = await fetch("/api/register", {
            // ใส่ / นำหน้าเพื่อให้เป็น absolute path
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.success); // แจ้งเตือนการสมัครสำเร็จ
            window.location.href = "/signin"; // redirect ไปหน้า login
        } else {
            alert(result.error); // แจ้ง error ที่ได้จาก backend
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ:", error);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
        event.preventDefault();
        event.target.disabled = false; // เปิดปุ่มกลับหลังจากทำงานเสร็จ
    }
}