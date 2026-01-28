document.addEventListener('DOMContentLoaded', function(){
  // Initialize EmailJS if available. Guard so missing CDN doesn't break the page.
  if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
    try {
      emailjs.init('kqv0QeMXSuu6YrBGb');
    } catch (err) {
      console.warn('emailjs init failed:', err);
    }
  } else {
    console.warn('emailjs not loaded; contact form will be disabled.');
  }
  
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  hamburger.addEventListener('click', ()=>{
    nav.classList.toggle('show');
    hamburger.classList.toggle('active');
  });
  // Close mobile menu when a nav link is clicked
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>nav.classList.remove('show')));

  // Contact form handling with EmailJS
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    // Send email only if emailjs is available
    if (typeof emailjs !== 'undefined' && typeof emailjs.sendForm === 'function') {
      emailjs.sendForm('service_2tq504o', 'template_dd5pt1g', form)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          btn.textContent = 'Message Sent!';
          form.reset();
          setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.disabled = false;
          }, 2000);
        }, (error) => {
          console.log('FAILED...', error);
          btn.textContent = 'Send Message';
          btn.disabled = false;
          alert('Failed to send message. Please try again.');
        });
    } else {
      // Fallback: open user's mail client via mailto with form contents
      console.warn('emailjs.sendForm not available — using mailto fallback.');
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const fromEmail = formData.get('email') || '';
      const message = formData.get('message') || '';
      const subject = encodeURIComponent(`Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}%0AEmail: ${fromEmail}%0A%0A${message}`);
      const mailto = `mailto:lucyamarachi81@gmail.com?subject=${subject}&body=${body}`;
      // open mail client
      window.location.href = mailto;
      // restore button state after a short delay
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }, 800);
    }
  });
});
