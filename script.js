
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  if (cursor && ring && !('ontouchstart' in window)) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a,button,.sol-card,.step,.tech-feat,.benefit-card,.faq-q').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });
  }

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  window.toggleFaq = function(btn){
    const item = btn.closest('.faq-item');
    document.querySelectorAll('.faq-item').forEach(f => {
      if(f !== item) f.classList.remove('open');
    });
    item.classList.toggle('open');
  };

  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const original = el.textContent.trim();
      const num = parseInt(original.replace(/\D/g,''));
      if (!num || original.includes('3D')) return;

      let current = 0;
      const step = num / 40;

      const animate = () => {
        current += step;
        if(current < num){
          el.textContent = Math.floor(current) + (original.includes('%') ? '%' : original.includes('+') ? '+' : '');
          requestAnimationFrame(animate);
        } else {
          el.textContent = original;
        }
      };
      animate();
      obs.unobserve(el);
    });
  }, {threshold:0.5});

  counters.forEach(c => counterObserver.observe(c));
});
