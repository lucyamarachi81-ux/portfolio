document.addEventListener('DOMContentLoaded', function(){
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  hamburger.addEventListener('click', ()=>{
    nav.classList.toggle('show');
    hamburger.classList.toggle('active');
  });
  // Close mobile menu when a nav link is clicked
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>nav.classList.remove('show')));

  // Simple contact form handling
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    setTimeout(()=>{
      btn.textContent = 'Send Message';
      form.reset();
      alert('Thanks — message simulated (no backend).');
    },800);
  });
});
