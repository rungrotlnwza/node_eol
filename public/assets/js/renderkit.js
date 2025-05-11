class Component {
    static queue = [];
    static isReady = false;

    static async load(targetId, path = null, altOrText = "") {
        const el = document.getElementById(targetId);
        if (!el) return console.warn(`⚠️ ไม่พบ element: #${targetId}`);
        const tag = el.tagName;

        // ✅ โหลด HTML Component ถ้ามี path
        if (path) {
            try {
                const res = await fetch(path);
                if (!res.ok) throw new Error(`โหลด component ไม่สำเร็จ: ${path}`);
                el.innerHTML = await res.text();
                return;
            } catch (err) {
                console.error("❌ ปัญหาโหลด component:", err);
                return;
            }
        }

        // ✅ โหลดจาก mockCMS
        const data = this.smartDataLookup(targetId);
        if (!data) return console.warn(`❓ ไม่มีข้อมูลใน CMS สำหรับ ${targetId}`);

        if (tag === "IMG") {
            el.src = data.src;
            el.alt = data.alt || "";
            el.loading = "lazy";
        } else if (tag === "IFRAME") {
            el.src = data;
        } else if (targetId === "hero-media" || el.classList.contains("media-wrapper")) {
            el.innerHTML = `
          <iframe width="100%" height="315"
            src="${data}" title="EOL Introduction Video"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>`;
        } else {
            el.textContent = data;
        }
    }

    static smartDataLookup(id) {
        for (const section in mockCMS) {
            if (mockCMS[section][id]) return mockCMS[section][id];
            if (mockCMS[section][id.replace("hero-", "")]) return mockCMS[section][id.replace("hero-", "")];
        }
        return null;
    }

    static init() {
        this.isReady = true;
        while (this.queue.length > 0) {
            const fn = this.queue.shift();
            fn();
        }
    }

    static queueLoad(...args) {
        const task = () => this.load(...args);
        if (this.isReady) task();
        else this.queue.push(task);
    }
}

window.addEventListener("DOMContentLoaded", () => Component.init());