/* nav-footer.js - injects shared nav and footer */
(function () {
  var NAV = `
  <nav class="site-nav" id="siteNav">
    <a href="index.html" class="nav-logo"><img src="logo.png" alt="Amani Protection Logo" class="logo-img"><div>Amani <span>Protection</span></div></a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="portfolio.html">Portfolio</a></li>
      <li><a href="careers.html">Careers</a></li>
      <li><a href="faq.html">FAQ</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <a href="quote.html" class="nav-cta">Get a Quote</a>
    <button class="nav-toggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>`;

  var FOOTER = `
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <p>Professional security services across Canada. Peace of mind through dependable protection.</p>
      </div>
      <div class="footer-col">
        <h5>Services</h5>
        <ul>
          <li><a href="services.html#events">Event Security</a></li>
          <li><a href="services.html#concierge">Concierge Services</a></li>
          <li><a href="services.html#patrol">Patrol Services</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="careers.html">Careers</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Use</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <div class="footer-contact-item"><span>&#9993;</span> info@amaniprotection.com</div>
        <div class="footer-contact-item"><span>&#128205;</span> Serving all of Canada</div>
        <div class="footer-contact-item"><span>&#128336;</span> Available 24/7</div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">&copy; 2025 Amani Protection Group. All rights reserved. Licensed and Insured.</p>
      <div class="footer-legal">
        <a href="privacy.html">Privacy Policy</a>
        <a href="terms.html">Terms of Use</a>
      </div>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', NAV);
  
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('beforeend', FOOTER);
  });
})();
