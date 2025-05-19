export async function Click_Login(event) {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let data = { username, password };
    if (!username || !password) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน")
        return;
    }
    console.log(data)

    try {
        const response = await fetch('api/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const result = await response.json()
        if (response.ok) {
            /// ✅ ฟังก์ชัน set cookie
            function setCookie(name, value, days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                const expires = "expires=" + date.toUTCString();
                document.cookie = `${name}=${value}; ${expires}; path=/`;
            }

            // ✅ ฟังก์ชัน get cookie
            function getCookie(name) {
                const nameEQ = name + "=";
                const cookies = document.cookie.split(';');
                for (let c of cookies) {
                    c = c.trim();
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length);
                    }
                }
                return null;
            }

            // ✅ การใช้งาน
            setCookie("user", "userset", 1);

            // const user = getCookie("user");

            // if (user) {
            //     console.log("ได้แล้ว:", user);
            // } else {
            //     console.log("ไม่มี");
            // }


            alert(result.message);
            // window.location.href = "/";
        } else {
            alert(result.message);
        }


    } catch (error) {
        console.log('เกิดข้อมผิดพลาดในการเชื่อต่อ', message)
        alert('เกิดข้อผิดพลาดในการเชื่อต่อ')
    }
}