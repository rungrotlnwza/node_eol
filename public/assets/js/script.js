import { Component } from "./renderkit.js";
if (document.getElementById("navbar")) {
    Component.load("navbar", "components/navbar.html").then(() => {
        toggleNavbarByAuth();
    });

    function toggleNavbarByAuth() {
        const token = localStorage.getItem("auth_token");
        const loginItems = document.querySelectorAll(".login");
        const unloginItems = document.querySelectorAll(".unlogin");
        const isLoggedIn = !!token;

        loginItems.forEach(
            (el) => (el.style.display = isLoggedIn ? "flex" : "none")
        );
        unloginItems.forEach(
            (el) => (el.style.display = isLoggedIn ? "none" : "flex")
        );
    }
} else {
    console.warn("⚠️ ไม่พบ navbar");
}

if (document.getElementById("footer")) {
    Component.load("footer", "components/footer.html");
}

if (document.getElementById("index")) {
    import ("./typed.js");
    import ("./marquee.js");
}
if (document.getElementById("signup")) {
    import ("./register.js").then((mod) => {
        window.Click_Register = mod.Click_Register;
    });
}
if (document.getElementById("signin")) {
    try {
        import ("./login.js")
    } catch {
        console.log("can't import ./login")
    }
}