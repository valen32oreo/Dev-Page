// ------- Navbar: mobile toggle + scroll animation (fade + slide) -------
(function(){
  const navWrap = document.querySelector('.nav');
  const toggleBtn = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // Initialize state
  function updateNavState(){
    if(window.scrollY > 40){
      navWrap.classList.add('scrolled');
      navWrap.classList.remove('at-top');
    } else {
      navWrap.classList.remove('scrolled');
      navWrap.classList.add('at-top');
    }
  }
  updateNavState();

  // smooth show/hide on scroll
  window.addEventListener('scroll', updateNavState, {passive:true});

  // toggle mobile menu
  toggleBtn.addEventListener('click', function(e){
    const isOpen = navWrap.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  // close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
    navWrap.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded','false');
    mobileMenu.setAttribute('aria-hidden','true');
  }));

  // close mobile menu when clicking outside
  document.addEventListener('click', (e)=>{
    if(!navWrap.contains(e.target) && navWrap.classList.contains('open')){
      navWrap.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded','false');
      mobileMenu.setAttribute('aria-hidden','true');
    }
  });

  // on resize, ensure mobile menu is hidden if desktop
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 768 && navWrap.classList.contains('open')){
      navWrap.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded','false');
      mobileMenu.setAttribute('aria-hidden','true');
    }
  });

  // small entry animation on load
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      navWrap.classList.remove('at-top');
    }, 180);
  });
})();

// ------- Smooth contact form (fake send) -------
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  const btn = this.querySelector('button[type=submit]');
  btn.disabled = true; btn.textContent = 'Sending...';
  setTimeout(()=>{ btn.textContent = 'Sent ✓'; btn.disabled = false; this.reset(); }, 1100);
});

// small accessibility: allow keyboard nav for projects
document.querySelectorAll('.card-project').forEach((c)=>{c.tabIndex=0;c.addEventListener('keyup', (e)=>{ if(e.key === 'Enter') c.querySelector('.overlay')?.click() })});