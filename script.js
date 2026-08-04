/* ==========================================================================
   ELA GLASS — Scripts du site (vanilla JS, aucune dépendance)
   ========================================================================== */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 60);
    if (toTop) toTop.classList.toggle('show', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Menu mobile ---- */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (!navLinks || !burger) return;
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.style.overflow = '';
  }
  function toggleMenu() {
    if (!navLinks || !burger) return;
    var open = navLinks.classList.toggle('open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) burger.addEventListener('click', toggleMenu);
  if (navLinks) navLinks.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 900) closeMenu(); });

  /* ---- Révélation au défilement ---- */
  var revealEls = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      io.observe(el);
    });
  }

  /* ---- Retour en haut ---- */
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });

  /* ---- Année ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
