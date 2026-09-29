/* shared.js - nav highlight, scroll reveal, FAQ, mobile menu */
document.addEventListener('DOMContentLoaded', function () {

  /* Active nav link */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* Mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-mobile-open');
    });
  }

  /* Scroll reveal */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* Keep the photo-only gallery in sync with the admin photo list.
     The HTML photos remain available if the API is unavailable. */
  var galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    fetch('/api/photos')
      .then(function (response) {
        if (!response.ok) throw new Error('Photos unavailable');
        return response.json();
      })
      .then(function (photos) {
        if (!Array.isArray(photos)) return;
        var fragment = document.createDocumentFragment();
        photos.forEach(function (photo, index) {
          if (!photo.src || !/\.(jpe?g|png|webp|gif)$/i.test(photo.src)) return;
          var item = document.createElement('div');
          item.className = 'portfolio-item';
          var img = document.createElement('img');
          img.src = photo.src;
          img.alt = 'Amani Protection event photo ' + (index + 1);
          img.loading = 'lazy';
          img.decoding = 'async';
          item.appendChild(img);
          fragment.appendChild(item);
        });
        if (fragment.childNodes.length) galleryGrid.replaceChildren(fragment);
      })
      .catch(function () { /* Retain the built-in event photos. */ });
  }

  /* Form submit feedback */
  document.querySelectorAll('form.ajax-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var orig = btn.textContent;
      btn.textContent = 'Sent! We will be in touch shortly.';
      btn.disabled = true;
      btn.style.background = '#1a5c2a';
      btn.style.color = '#fff';
      setTimeout(function () { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; btn.style.color = ''; }, 5000);
    });
  });

});
