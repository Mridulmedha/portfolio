/* Theme persistence */
const themeBtn = document.getElementById('dark-mode-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function applyTheme(theme){
  if(theme === 'dark') document.body.classList.add('dark-mode');
  else document.body.classList.remove('dark-mode');
  if(themeBtn) themeBtn.setAttribute('aria-pressed', theme === 'dark');
}

if(savedTheme) applyTheme(savedTheme);
else applyTheme(prefersDark ? 'dark' : 'light');

if(themeBtn){
  themeBtn.addEventListener('click', ()=>{
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.setAttribute('aria-pressed', isDark);
  });
}

/* Mobile nav toggle */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle) navToggle.addEventListener('click', ()=> navLinks && navLinks.classList.toggle('open'));

/* Reveal on scroll */
const revealTargets = document.querySelectorAll('.section, .project-card, .hero-card');
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('reveal');
  });
},{threshold:0.15});
revealTargets.forEach(t=>revealObserver.observe(t));

/* Simple typewriter for hero */
const typeEl = document.querySelector('.typewriter');
const typePhrases = [
  'Building web apps — front-end, back-end, and APIs',
  'Working on IoT projects, data flows and integrations',
  'Focused on reliable systems, usability and real results'
];
let tIndex=0, cIndex=0;
function typeWriter(){
  if(!typeEl) return;
  const text = typePhrases[tIndex];
  if(cIndex <= text.length){
    typeEl.textContent = text.slice(0,cIndex++);
    setTimeout(typeWriter, 42);
  } else {
    setTimeout(()=>{ cIndex=0; tIndex=(tIndex+1)%typePhrases.length; typeEl.textContent=''; setTimeout(typeWriter,500); }, 1400);
  }
}
typeWriter();

/* Contact form */
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(formMessage) formMessage.textContent = 'Sending...';
    const data = new FormData(form);
    try{
      const res = await fetch(form.action, { method:'POST', body:data, headers:{ 'Accept':'application/json' }});
      if(res.ok){ if(formMessage) formMessage.textContent = 'Thanks — message sent!'; form.reset(); }
      else { const json = await res.json(); if(formMessage) formMessage.textContent = json.error || 'Unable to send message'; }
    }catch(err){ if(formMessage) formMessage.textContent = 'Network error — try again later'; }
  });
}
