function loadHTMLComponent() {
  const e = document.querySelectorAll("[rot-html]");
  e.forEach((el) => {
    const file = el.getAttribute("rot-html");
    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`ข่อยคือโหลดบอ่ได้: ${file}`);
        return res.text();
      })
      .then((data) => {
        el.innerHTML = data;

        const check = document.getElementById("login");

        if (check) {
          console.log(`ได้ยุตั้ว`);
        } else {
          console.log(`olo: โหลดบ่ได้บักควย`);
        }
      })
      .catch((err) => {
        el.innerHTML = `olo: <pre>${err}</pre>`;
      });
  });
}
window.addEventListener("DOMContentLoaded", loadHTMLComponent);
