// ---------- MISSION LAYER PARALLAX ----------
function initMissionLayerReveal() {
  const missionSection = document.querySelector(".mission-split");
  if (!missionSection) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const mobileQuery = window.matchMedia("(max-width: 700px)");
  let ticking = false;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const updateMissionLayer = () => {
    if (mobileQuery.matches) {
      missionSection.style.setProperty("--mission-layer-shift", "0px");
      missionSection.style.setProperty("--mission-layer-scale", "1.04");
      missionSection.style.setProperty("--mission-layer-veil", "0.58");
      missionSection.style.setProperty("--mission-fade-drift", "0px");
      ticking = false;
      return;
    }

    const rect = missionSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const revealProgress = clamp((viewportHeight - rect.top) / (viewportHeight * 1.18), 0, 1);

    const shift = (1 - revealProgress) * 150;
    const scale = 1.03 + (1 - revealProgress) * 0.38;
    const veil = 0.40 + (1 - revealProgress) * 0.50;
    const fadeDrift = 0;

    missionSection.style.setProperty("--mission-layer-shift", `${shift.toFixed(1)}px`);
    missionSection.style.setProperty("--mission-layer-scale", scale.toFixed(3));
    missionSection.style.setProperty("--mission-layer-veil", veil.toFixed(3));
    missionSection.style.setProperty("--mission-fade-drift", `${fadeDrift.toFixed(1)}px`);
    ticking = false;
  };

  updateMissionLayer();

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateMissionLayer);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", updateMissionLayer);
}

// ---------- STORY BLUE PANEL PARALLAX ----------
function initStoryBlueParallax() {
  const bluePanel = document.querySelector(".story-panel-blue");
  if (!bluePanel) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const mobileQuery = window.matchMedia("(max-width: 700px)");
  let ticking = false;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const updateBluePanel = () => {
    if (mobileQuery.matches) {
      bluePanel.style.setProperty("--story-blue-shift", "0px");
      bluePanel.style.setProperty("--story-blue-tilt", "0deg");
      bluePanel.style.setProperty("--story-impact-y", "50%");
      ticking = false;
      return;
    }

    const rect = bluePanel.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
    const shift = (progress - 0.5) * 90;
    const tilt = (progress - 0.5) * 2.2;
    const impactY = 64 - progress * 28;

    bluePanel.style.setProperty("--story-blue-shift", `${shift.toFixed(1)}px`);
    bluePanel.style.setProperty("--story-blue-tilt", `${tilt.toFixed(2)}deg`);
    bluePanel.style.setProperty("--story-impact-y", `${impactY.toFixed(2)}%`);
    ticking = false;
  };

  updateBluePanel();

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateBluePanel);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", updateBluePanel);
}

// ---------- NAV SCROLL STATE ----------
function initNavScroll() {
  const topbar = document.getElementById("top");
  if (!topbar) return;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        topbar.classList.toggle("scrolled", window.scrollY > 50);
        if (window.scrollY > 150) {
          topbar.style.opacity = "0";
          topbar.style.pointerEvents = "none";
        } else {
          topbar.style.opacity = "1";
          topbar.style.pointerEvents = "auto";
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}