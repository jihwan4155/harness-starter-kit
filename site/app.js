/* =========================================================
   Harness Starter Kit — site interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---------- language toggle (KO / EN) ---------- */
  const body = document.body;
  const langToggle = document.getElementById("lang-toggle");

  function applyLang(lang) {
    body.setAttribute("data-lang", lang);
    body.parentElement.setAttribute("lang", lang === "ko" ? "ko" : "en");
    document.querySelectorAll(".i18n").forEach(function (el) {
      const txt = el.getAttribute("data-" + lang);
      if (txt !== null) el.textContent = txt;
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      const next = body.getAttribute("data-lang") === "ko" ? "en" : "ko";
      applyLang(next);
    });
  }
  applyLang("en");

  /* ---------- copy prompt ---------- */
  const copyBtn = document.getElementById("copy-btn");
  const promptText = document.getElementById("prompt-text");
  const toast = document.getElementById("toast");

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("show");
    }, 1800);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  if (copyBtn && promptText) {
    copyBtn.addEventListener("click", function () {
      const isKo = body.getAttribute("data-lang") === "ko";
      copyText(promptText.innerText)
        .then(function () {
          copyBtn.classList.add("copied");
          const label = copyBtn.querySelector(".copy-label");
          if (label) label.textContent = isKo ? "복사됨" : "Copied";
          showToast(isKo ? "프롬프트가 복사되었습니다" : "Prompt copied to clipboard");
          setTimeout(function () {
            copyBtn.classList.remove("copied");
            if (label) label.textContent = isKo ? "복사" : "Copy";
          }, 1800);
        })
        .catch(function () {
          showToast(isKo ? "복사에 실패했습니다" : "Copy failed");
        });
    });
  }

  /* ---------- scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------- scroll progress + topbar shadow ---------- */
  const bar = document.getElementById("scroll-bar");
  const topbar = document.querySelector(".topbar");
  let ticking = false;

  function onScroll() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    if (bar) bar.style.width = pct + "%";
    if (topbar) topbar.classList.toggle("scrolled", scrollTop > 8);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();
})();
