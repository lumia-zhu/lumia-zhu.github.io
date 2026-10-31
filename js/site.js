/** Navigation, section highlighting, back-to-top, and publication previews. */
(() => {
  'use strict';
  document.documentElement.classList.replace('no-js', 'js');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-navigation');
  const mobile = window.matchMedia('(max-width: 768px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function closeMenu() {
    toggle?.classList.remove('is-clicked');
    toggle?.setAttribute('aria-expanded', 'false');
    if (nav) nav.style.display = '';
  }
  toggle?.addEventListener('click', (event) => {
    event.preventDefault();
    const open = toggle.classList.toggle('is-clicked');
    toggle.setAttribute('aria-expanded', String(open));
    if (nav) nav.style.display = open ? 'block' : '';
  });
  nav?.addEventListener('click', (event) => {
    if (mobile.matches && event.target.closest('a')) closeMenu();
  });
  mobile.addEventListener('change', closeMenu);

  const experience = document.querySelector('#experience.home-experience');
  const homeLink = nav?.querySelector('a[href="#top"]');
  const experienceLink = nav?.querySelector('a[href="#experience"]');
  const goTop = document.getElementById('go-top');
  let pending = false;
  function updateScrollState() {
    pending = false;
    goTop?.classList.toggle('is-visible', window.scrollY >= 300);
    if (!experience || !homeLink || !experienceLink) return;
    const bounds = experience.getBoundingClientRect();
    let offset = parseFloat(getComputedStyle(experience).scrollMarginTop) || 100;
    offset *= bounds.height / experience.offsetHeight;
    const inExperience = bounds.top <= offset + 4 && bounds.bottom > offset;
    homeLink.parentElement.classList.toggle('current', !inExperience);
    experienceLink.parentElement.classList.toggle('current', inExperience);
    homeLink.removeAttribute('aria-current');
    experienceLink.removeAttribute('aria-current');
    (inExperience ? experienceLink : homeLink).setAttribute('aria-current', 'location');
  }
  function scheduleScrollState() {
    if (!pending) { pending = true; requestAnimationFrame(updateScrollState); }
  }
  window.addEventListener('scroll', scheduleScrollState, { passive: true });
  ['resize', 'hashchange', 'pageshow'].forEach((event) => window.addEventListener(event, scheduleScrollState));
  window.addEventListener('load', () => {
    if (experience && location.hash === '#experience') experience.scrollIntoView({ behavior: 'instant', block: 'start' });
    updateScrollState();
  });
  updateScrollState();

  document.querySelectorAll('.smoothscroll').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
    });
  });

  const lightbox = document.getElementById('lightbox');
  const preview = document.getElementById('lightbox-img');
  function closePreview() {
    lightbox?.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (lightbox && !lightbox.classList.contains('is-open')) preview?.removeAttribute('src');
    }, 300);
  }
  if (lightbox && preview) {
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('.pub-thumb img, .sel-pub-thumb .figure-preview');
      if (!trigger) return;
      const image = trigger.matches('img') ? trigger : trigger.querySelector('img');
      if (!image) return;
      preview.src = image.src;
      preview.alt = image.alt;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target.closest('#lightbox-close')) closePreview();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) closePreview();
    });
  }
})();
