var typed = new Typed("#typed", {
    stringsElement: "#typed-strings",
    typeSpeed: 40, // ความเร็วพิมพ์ (ms)
    backSpeed: 30, // ความเร็วลบ (ms)
    backDelay: 1000, // ดีเลย์ก่อนลบ (ms)
    startDelay: 500, // ดีเลย์เริ่มต้น (ms)
    loop: true, // เปิดใช้งานลูป
    smartBackspace: true, // ลบแบบอัจฉริยะ
    showCursor: true, // แสดงเคอร์เซอร์
    // onComplete: (self) => {
    //   console.log("Completed!", self);
    // },
});