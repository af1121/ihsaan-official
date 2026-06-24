// ---------- BUTTON RIPPLE EFFECT ----------
function initRippleEffect() {
  document.querySelectorAll(".btn, .donate-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      this.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

// ---------- 3D CARD TILT ----------
function initCardTilt() {
  const cards = document.querySelectorAll(".prog-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    });
  });
}

// ---------- COUNT UP COUNTERS ----------
let impactCounterStarted = false;

function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target || "0", 10);
    const duration = 2000;
    const startTime = performance.now();
    counter.classList.add("counting");

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const value = Math.floor(easedProgress * target);
      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = target.toLocaleString() + "+";
        counter.classList.remove("counting");
        counter.classList.add("done");
      }
    }
    requestAnimationFrame(tick);
  });
}

function initCounterObserver() {
  const impact = document.getElementById("impactSection");
  if (!impact) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !impactCounterStarted) {
        impactCounterStarted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.2 });

  obs.observe(impact);
}