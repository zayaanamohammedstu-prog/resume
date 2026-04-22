// ===== NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
const navbar    = document.getElementById('navbar');
const allNavLinks = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== SKILL BAR ANIMATION =====
// Bars already have inline style="width:X%" set in HTML as the no-JS fallback.
// The observer resets each bar to 0 then animates it to its target width
// when it enters the viewport, creating the fill-up effect.

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      // briefly collapse then expand for the animation
      bar.style.transition = 'none';
      bar.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.transition = '';
          bar.style.width = bar.dataset.width;
        });
      });
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar').forEach(bar => barObserver.observe(bar));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = '✅ Message sent! I\'ll get back to you soon.';
    status.style.color = '#86efac';
    contactForm.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });
}

// ===== TYPED SUBTITLE EFFECT =====
const roles = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'Data Analyst',
  'Cloud Engineer',
  'Technical Writer',
  'Public Speaker',
];

let roleIndex = 0;
let charIndex  = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typed-role');

function typeEffect() {
  if (!typedEl) return;
  const current = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1800);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();
