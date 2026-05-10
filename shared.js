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

  /* Dynamic Portfolio rendering from Backend */
  var photos = [];
  var currentFilter = 'all';
  var galleryGrid = document.getElementById('galleryGrid');

  function renderGallery() {
    if (!galleryGrid) return;
    var filtered = currentFilter === 'all' ? photos : photos.filter(function (p) { return p.category === currentFilter; });
    
    if (filtered.length === 0) {
      galleryGrid.innerHTML = '<div class="portfolio-placeholder"><strong>' +
        (currentFilter === 'all' ? 'No photos yet' : 'No photos in this category') +
        '</strong></div>';
      return;
    }
    
    galleryGrid.innerHTML = filtered.map(function (p) {
      return '<div class="portfolio-item" data-category="' + p.category + '">' +
        '<img src="' + p.src + '" alt="' + p.category + '">' +
        '<div class="portfolio-overlay"><div>' +
        '<div class="portfolio-tag">' + p.category + '</div>' +
        '<p style="color:white; font-size:14px; font-weight:600; margin-top:8px;">' + p.caption + '</p>' +
        '</div></div></div>';
    }).join('');
  }

  if (galleryGrid) {
    fetch('portfolio.json')
      .then(res => res.json())
      .then(data => {
        // Make image paths relative to work on GitHub Pages subdirectories
        photos = data.map(function(p) {
          if (p.src && p.src.startsWith('/')) {
            p.src = '.' + p.src;
          }
          return p;
        });
        renderGallery();
      })
      .catch(err => console.error("Error loading photos:", err));
  }

  window.setFilter = function (filter, btn) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderGallery();
  };

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
