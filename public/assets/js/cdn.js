function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function loadCSS(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

const globalCDN = {
    css: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "assets/css/style.css",
    ],
    js: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
        "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js", "assets/js/renderkit.js", "assets/js/script.js"
    ]
};

const pageAssets = {
    "index": {
        css: [],
        js: [
            "https://cdn.jsdelivr.net/npm/jquery.marquee/jquery.marquee.min.js",
            "https://cdn.jsdelivr.net/npm/typed.js@2.0.12",
        ],
        init: () => {
            new Typed('#typed-text', {
                strings: ["อดีต", "ปัจจุบัน", "อนาคต", "เวลาไหนก็สำคัญ"],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 5000,
                startDelay: 500,
                loop: true
            });
            const marquees = document.querySelectorAll('.marquee');
            marquees.forEach(marquee => {
                const logos = marquee.innerHTML;
                marquee.innerHTML = logos + logos + logos;

                let speed = 1;
                let position = 0;
                let isPaused = false;

                function animate() {
                    if (!isPaused) {
                        position -= speed;
                        if (position <= -marquee.scrollWidth / 4) {
                            position = 0;
                        }
                        marquee.style.transform = `translateX(${position}px)`;
                    }
                    requestAnimationFrame(animate);
                }
                setTimeout(() => {
                    animate();
                }, 100);
                marquee.addEventListener('mouseenter', () => isPaused = true);
                marquee.addEventListener('mouseleave', () => isPaused = false);
            });
        }
    },
    "signup": {
        css: [],
        js: ["https://cdn.jsdelivr.net/npm/sweetalert2@11", "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"],
        init: () => {
            console.log("signup.init loaded");
            document.getElementById("register").addEventListener("click", () => {
                let data = {
                    username: document.getElementById("username").value.trim(),
                    password: document.getElementById("password").value.trim(),
                    confirm_password: document.getElementById("confirm_password").value.trim(),
                }
                axios.post("api/register", {
                    message: data
                }).then(res => {
                    if (res.data.status == "success") {
                        Swal.fire({
                            icon: 'success',
                            title: 'สำเร็จ',
                            text: res.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.href = "/login";
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ผิดพลาด',
                            text: res.data.message,
                        });
                    }
                }).catch(err => {
                    console.error(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'ผิดพลาด',
                        text: 'เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง',
                    });
                });
            });
        }
    }
};

async function loadAssets() {
    globalCDN.css.forEach(loadCSS);
    for (const src of globalCDN.js) await loadScript(src);

    const pageId = document.body.id;
    const assets = pageAssets[pageId];

    if (assets) {
        if (assets.css) {
            assets.css.forEach(loadCSS);
        }

        if (assets.js) {
            for (const src of assets.js) {
                await loadScript(src);
            }
        }

        if (typeof assets.init === "function") {
            assets.init();
        }
    }
}

loadAssets().catch(err =>
    console.error("[LiteCDN] Failed to load assets:", err)
);