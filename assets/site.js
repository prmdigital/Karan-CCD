(function () {
  'use strict';

  function closeNav(toggle, nav) {
    document.body.classList.remove('ccd-nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.ccd-dd.ccd-dd-open').forEach(function (dd) {
      dd.classList.remove('ccd-dd-open');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.ccd-header');
    var nav = header ? header.querySelector('.ccd-nav') : null;
    var toggle = header ? header.querySelector('.ccd-nav-toggle') : null;
    var scrim = document.querySelector('.ccd-nav-scrim');

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var isOpen = document.body.classList.toggle('ccd-nav-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (!isOpen) closeNav(toggle, nav);
      });
    }

    if (scrim) {
      scrim.addEventListener('click', function () { closeNav(toggle, nav); });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav(toggle, nav);
    });

    if (nav) {
      nav.querySelectorAll('a[href]:not([href="#"])').forEach(function (a) {
        a.addEventListener('click', function () { closeNav(toggle, nav); });
      });
    }

    // Services dropdown: click/tap toggles open (desktop keeps working via
    // CSS :hover too). Needed because touch devices have no hover state.
    document.querySelectorAll('.ccd-dd').forEach(function (dd) {
      var trigger = dd.querySelector('a');
      if (!trigger) return;
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var willOpen = !dd.classList.contains('ccd-dd-open');
        document.querySelectorAll('.ccd-dd.ccd-dd-open').forEach(function (other) {
          if (other !== dd) other.classList.remove('ccd-dd-open');
        });
        dd.classList.toggle('ccd-dd-open', willOpen);
      });
    });

    document.addEventListener('click', function (e) {
      document.querySelectorAll('.ccd-dd.ccd-dd-open').forEach(function (dd) {
        if (!dd.contains(e.target)) dd.classList.remove('ccd-dd-open');
      });
    });
  });
})();
