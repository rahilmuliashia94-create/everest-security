/* ===================================
   OSTC EXECUTIVE INTERACTION ENGINE
   Includes: Dark Mode, Counters, 
   Scroll Reveal, and Accordions
=================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
      1. THEME TOGGLE LOGIC
  =============================== */
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  // Apply saved theme on page load
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.innerText = "☀️";
  } else {
    if (themeToggle) themeToggle.innerText = "🌙";
  }

  // Toggle click event
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      let theme = document.documentElement.getAttribute("data-theme");
      
      if (theme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        this.innerText = "🌙";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        this.innerText = "☀️";
      }
    });
  }

  /* ===============================
      2. SCROLL REVEAL
  =============================== */
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* ===============================
      3. ANIMATED COUNTERS
  =============================== */
  const counters = document.querySelectorAll(".counter");

  function runCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 200;

    function updateCounter() {
      count += increment;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    }

    updateCounter();
  }

  function triggerCounters() {
    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50 && !counter.classList.contains("counted")) {
        counter.classList.add("counted");
        runCounter(counter);
      }
    });
  }

  window.addEventListener("scroll", triggerCounters);
  triggerCounters();

  /* ===============================
      4. TIMELINE PROGRESS ANIMATION
  =============================== */
  const steps = document.querySelectorAll(".step");

  function animateTimeline() {
    steps.forEach(step => {
      const rect = step.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        const fill = step.querySelector(".progress-fill");
        if (fill) fill.style.width = "100%";
      }
    });
  }

  window.addEventListener("scroll", animateTimeline);
  animateTimeline();

  /* ===============================
      5. ACCORDION (COUNTRIES/SERVICES)
  =============================== */
  const accordions = document.querySelectorAll(".accordion-header");

  accordions.forEach(header => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        // Close other open accordions
        document.querySelectorAll(".accordion-content").forEach(c => {
          c.style.maxHeight = null;
        });
        content.style.maxHeight = content.scrollHeight + "px";
      }

       // ===== OSTC Employer Reviews rotation (10s each) =====
(function(){
  const container = document.querySelector('.ostc-reviews');
  if(!container) return;

  const reviews = Array.from(container.querySelectorAll('.review'));
  if(!reviews.length) return;

  const INTERVAL = 10000; // 10 seconds
  let idx = reviews.findIndex(r => r.classList.contains('active'));
  if(idx === -1) idx = 0;

  // ensure only one active at start
  reviews.forEach((r, i) => {
    r.classList.toggle('active', i === idx);
    r.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
  });

  let timer = null;
  function show(i){
    reviews.forEach((r, n) => {
      r.classList.toggle('active', n === i);
      r.setAttribute('aria-hidden', n === i ? 'false' : 'true');
    });
  }

  function next(){
    idx = (idx + 1) % reviews.length;
    show(idx);
  }

  function start(){
    stop();
    timer = setInterval(next, INTERVAL);
  }
  function stop(){
    if(timer){ clearInterval(timer); timer = null; }
  }

  // Pause rotation when page isn't visible
  document.addEventListener('visibilitychange', () => {
    if(document.hidden) stop(); else start();
  });

  // Start after DOM ready or immediately if already ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => { start(); });
  } else {
    start();
  }
})();
    });
  });

});
