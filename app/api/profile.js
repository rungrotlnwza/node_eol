module.export = async (req, res) => {
    const {username,token} = req.body;

    if (!username || !token) {
        return res.status(403).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

}