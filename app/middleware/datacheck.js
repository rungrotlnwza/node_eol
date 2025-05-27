if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "ไม่พบข้อมูลที่ส่งมา" });
  }