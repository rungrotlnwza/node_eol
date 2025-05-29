import { Component } from "./renderkit.js";
import { getCookie } from "./cookie_get.js";

if (document.getElementById("navbar")) {
  Component.load("navbar", "components/navbar.html").then(() => {
    const user = getCookie("username");

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
  if (document.cookie.includes("username")) {
    window.location.href = "/";
  }
  import("./login.js").then((mod) => {
    window.Click_Login = mod.Click_Login;
  });
}
if(document.getElementById("profile")){
  Component.load("profile","components/profile.html")
  Component.load("edit-profile", "components/edit-profile.html").then(() => {
    console.log("Edit profile component loaded successfully.");
  const fileInputs = document.querySelectorAll('.select-file');

  fileInputs.forEach(input => {
    input.addEventListener('change', function () {
      const previewId = this.getAttribute('data-preview');
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.getElementById(previewId);
          if (img) {
            img.src = e.target.result;
            img.style.display = 'inline-block';
          }
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
});
}