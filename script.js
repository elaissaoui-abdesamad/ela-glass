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
  var overlay = document.getElementById('navOverlay');

  function closeMenu() {
    if (!navLinks || !burger) return;
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    overlay && overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  }
  function toggleMenu() {
    if (!navLinks || !burger) return;
    var open = navLinks.classList.toggle('open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    overlay && overlay.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) burger.addEventListener('click', toggleMenu);
  overlay && overlay.addEventListener('click', closeMenu);
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

  /* ---- Barre CTA mobile : masquer sur #contact ---- */
  var mcta=document.querySelector('.mobile-cta'), contact=document.getElementById('contact');
  if(mcta&&contact&&'IntersectionObserver' in window){
    new IntersectionObserver(function(e){mcta.style.transform=e[0].isIntersecting?'translateY(110%)':'';},{threshold:0.25}).observe(contact);
  }

  /* ---- Retour en haut ---- */
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });


  /* ---- Lightbox galerie ---- */
  (function () {
    var items = document.querySelectorAll('.masonry .item');
    if (!items.length) return;
    var lb = null, lbImg = null;
    function build() {
      lb = document.createElement('dialog');
      lb.id = 'lb';
      lb.innerHTML = '<button type="button" class="lb-close" aria-label="Fermer">\u00D7</button><img alt="">';
      lbImg = lb.querySelector('img');
      document.body.appendChild(lb);
      lb.addEventListener('click', function (e) {
        if (e.target === lb || e.target.classList.contains('lb-close')) close();
      });
    }
    function open(src, alt) {
      if (!lb) build();
      lbImg.src = src; lbImg.alt = alt || '';
      if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
    }
    function close() {
      if (!lb) return;
      if (typeof lb.close === 'function') lb.close(); else lb.removeAttribute('open');
      lbImg.src = '';
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    items.forEach(function (it) {
      it.setAttribute('tabindex', '0');
      it.setAttribute('role', 'button');
      var img = it.querySelector('img');
      function trigger() { if (img) open(img.currentSrc || img.src, img.alt); }
      it.addEventListener('click', trigger);
      it.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
      });
    });
  })();

  /* ---- Année ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
