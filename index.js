document.addEventListener('DOMContentLoaded', function(){
  // Initialize EmailJS - Paste your PUBLIC KEY here
  emailjs.init('kqv0QeMXSuu6YrBGb');
  
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
    
    // Send email - Paste your SERVICE_ID and TEMPLATE_ID
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
  });
});
