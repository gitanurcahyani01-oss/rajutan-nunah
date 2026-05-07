// ============================================
//   RAJUTAN BY NUNAH — JavaScript
// ============================================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));

// ---- Product card scroll animation ----
const cards = document.querySelectorAll('.product-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => cardObserver.observe(card));

// ---- Custom Order button ----
const customOrderBtn = document.getElementById('customOrderBtn');
const customIdea = document.getElementById('customIdea');

customOrderBtn.addEventListener('click', () => {
  const idea = customIdea.value.trim();
  const phone = '628974953838';
  let message;

  if (idea) {
    message = `Halo Nunah! 👋 Saya ingin membuat Custom Order 🧶\n\nIde saya:\n${idea}\n\nBisa bantu saya?`;
  } else {
    message = `Halo Nunah! 👋 Saya ingin membuat Custom Order 🧶\n\nBoleh saya konsultasi dulu?`;
  }

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});

// ---- Smooth entrance for about/custom cards ----
const fadeEls = document.querySelectorAll('.about-card, .custom-card');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 150);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// ---- Hero image frame gentle float ----
const heroFrame = document.querySelector('.hero-image-frame');
if (heroFrame) {
  let angle = 0;
  setInterval(() => {
    angle += 0.02;
    const y = Math.sin(angle) * 5;
    heroFrame.style.transform = `translateY(${y}px)`;
  }, 16);
}

// ---- Ripple click effect on buttons ----
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Only for non-link buttons
    if (this.tagName === 'BUTTON') {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%; transform:scale(0);
        animation:ripple 0.5s linear;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,0.3); pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(style);
