/* =====================================================
   WestJet Reservations — script.js
   Independent Travel Agency | Toronto, Canada
   ===================================================== */

(function () {
  'use strict';

  /* ---- Mobile Navigation Toggle ---- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Smooth scroll for anchor links (supplemental) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ---- Scroll Fade-In Animations ---- */
  const fadeElements = [];

  function addFadeTargets() {
    const selectors = [
      '.service-card',
      '.why-item',
      '.step',
      '.faq-card',
      '.trust-point',
      '.contact-card',
      '.section-header',
      '.trust-box'
    ];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add('fade-in');
        fadeElements.push(el);
      });
    });
  }

  function checkFade() {
    const triggerOffset = window.innerHeight * 0.88;
    fadeElements.forEach(function (el) {
      if (el.getBoundingClientRect().top < triggerOffset) {
        el.classList.add('visible');
      }
    });
  }

  /* ---- Sticky Call Button: hide when contact section is visible ---- */
  const stickyCall = document.getElementById('stickyCall');
  const contactSection = document.getElementById('contact');

  function handleStickyCall() {
    if (!stickyCall || !contactSection) return;
    const rect = contactSection.getBoundingClientRect();
    const isContactVisible = rect.top < window.innerHeight && rect.bottom > 0;
    stickyCall.style.display = isContactVisible ? 'none' : '';
  }

  /* ---- Stagger service cards ---- */
  function applyStaggerDelays() {
    document.querySelectorAll('.service-card').forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.07) + 's';
    });
    document.querySelectorAll('.why-item').forEach(function (item, i) {
      item.style.transitionDelay = (i * 0.07) + 's';
    });
    document.querySelectorAll('.faq-card').forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.06) + 's';
    });
  }

  /* ---- Header shadow on scroll ---- */
  const siteHeader = document.querySelector('.site-header');
  function updateHeaderShadow() {
    if (!siteHeader) return;
    if (window.scrollY > 10) {
      siteHeader.style.boxShadow = '0 2px 16px rgba(10,34,64,0.14)';
    } else {
      siteHeader.style.boxShadow = '';
    }
  }

  /* ---- Active nav link highlight ---- */
  const navLinks = document.querySelectorAll('.desktop-nav a');
  const sections = Array.from(navLinks)
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function updateActiveNav() {
    const scrollMid = window.scrollY + window.innerHeight / 2;
    let activeSection = null;
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollMid) {
        activeSection = section;
      }
    });
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      const match = activeSection && href === '#' + activeSection.id;
      link.style.color = match ? 'var(--sky)' : '';
      link.style.fontWeight = match ? '700' : '';
    });
  }

  /* ---- Init ---- */
  function init() {
    addFadeTargets();
    applyStaggerDelays();
    checkFade();
    handleStickyCall();
    updateHeaderShadow();

    window.addEventListener('scroll', function () {
      checkFade();
      handleStickyCall();
      updateHeaderShadow();
      updateActiveNav();
    }, { passive: true });

    window.addEventListener('resize', checkFade, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
