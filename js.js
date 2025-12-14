// ===============================
//   Mobile Menu + Smooth Scroll
// ===============================
(function () {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    // ===== Toggle mobile menu =====
    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");

            const expanded = menuBtn.getAttribute("aria-expanded") === "true";
            menuBtn.setAttribute("aria-expanded", !expanded);
            mobileMenu.setAttribute("aria-hidden", expanded);
        });

        mobileMenu.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                mobileMenu.setAttribute("aria-hidden", "true");
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                mobileMenu.classList.remove("active");
            }
        });
    }
    // ===== Event Filter =====
    const filter = document.getElementById("eventFilter");
    const eventsList = document.getElementById("eventsList");

    if (filter && eventsList) {
        filter.addEventListener("change", () => {
            const val = filter.value;
            const items = eventsList.querySelectorAll(".event");

            items.forEach(item => {
                const kind = item.getAttribute("data-kind");
                item.style.display = (val === "all" || val === kind) ? "flex" : "none";
            });
        });
    }


    // ===== Smooth scroll =====
    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", e => {
            const id = link.getAttribute("href");

            if (id.length > 1) {
                e.preventDefault();

                const target = document.querySelector(id);
                if (target)
                    target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

})();
// 
// ===== Toggle Event Details =====
document.querySelectorAll('.event .btn').forEach(btn => {
  btn.addEventListener('click', function(e){
    // بررسی اینکه آیا دکمه، دکمه اطلاعات بیشتر است
    if(this.textContent.includes('اطلاعات بیشتر')){
      e.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک
      const eventItem = this.closest('.event');
      const details = eventItem.querySelector('.event-details');
      if(details){
        // نمایش یا پنهان کردن
        details.style.display = (details.style.display === 'block') ? 'none' : 'block';
      }
    }
  });
});

// ===== Lightbox برای تصاویر event-details =====
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);

// وقتی روی هر عکس در event-details کلیک شد
document.querySelectorAll('.event-details img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

// بستن lightbox وقتی روی overlay کلیک شد
lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
});

