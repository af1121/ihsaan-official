// ---------- SCROLL REVEAL SYSTEM (data-reveal) ----------
function initRevealSystem() {
  const reveals = document.querySelectorAll("[data-reveal]:not(.is-visible)");
  if (!reveals.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.revealDelay || "0", 10);
        setTimeout(() => {
          el.classList.add("is-visible");
          setTimeout(() => { el.style.willChange = "auto"; }, 1000);
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach(el => observer.observe(el));
}

// ---------- SCROLL REVEAL (data-sr) + TIMELINE ITEMS ----------
function initScrollRevealAndTimeline() {
  const srEls = document.querySelectorAll('[data-sr]');
  const timelineEls = document.querySelectorAll('.timeline-item');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  srEls.forEach(el => io.observe(el));
  timelineEls.forEach(el => io.observe(el));

  setTimeout(() => {
    srEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
  }, 100);
}