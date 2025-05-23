import { Component } from "./renderkit.js";
import { getCookie } from "./cookie_get.js";

if (document.getElementById("navbar")) {
  Component.load("navbar", "components/navbar.html").then(() => {
    const user = getCookie("user");

    if (user) {
      document.getElementById("unlogin").style.display = "none";
    } else {
      document.getElementById("login").style.display = "none";
    }
  });
} else {
  console.warn("⚠️ ไม่พบ navbar");
}

if (document.getElementById("footer")) {
  Component.load("footer", "components/footer.html");
}

if (document.getElementById("index")) {
  import("./typed.js");
  import("./marquee.js");
}
if (document.getElementById("signup")) {
  import("./register.js").then((mod) => {
    window.Click_Register = mod.Click_Register;
  });
}
if (document.getElementById("signin")) {
  if (document.cookie.includes("user")) {
    window.location.href = "/";
  }
  import("./login.js").then((mod) => {
    window.Click_Login = mod.Click_Login;
  });
}
