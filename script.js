document.addEventListener("DOMContentLoaded", () => {
  // Fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOnScroll = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.3 });
  faders.forEach(section => appearOnScroll.observe(section));

  // Sparkles canvas
  const canvas = document.getElementById('sparklesCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createParticle(x, y) {
    return {
      x,
      y,
      size: Math.random() * 3 + 1,
      alpha: 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    };
  }

  function initSparkles() {
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle(Math.random() * 150, Math.random() * 150));
      particles.push(createParticle(canvas.width - 150 + Math.random() * 150, Math.random() * 150));
    }
  }
  initSparkles();

  window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
      const offsetX = Math.random() * 10 - 5;
      const offsetY = Math.random() * 10 - 5;
      particles.push(createParticle(e.clientX + offsetX, e.clientY + offsetY));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;

      if (p.alpha <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      for (let i = 0; i < 5; i++) {
        const x = e.clientX + (Math.random() * 20 - 10);
        const y = e.clientY + (Math.random() * 20 - 10);
        particles.push(createParticle(x, y));
      }
    });
  });

  const productBtns = document.querySelectorAll('.product-btn');
  productBtns.forEach(btn => {
    const local = btn.getAttribute('data-local');
    const fallback = btn.getAttribute('data-fallback');
    if (!local) return;
    const img = new Image();
    img.onload = () => {
      btn.style.backgroundImage = `url('${local}')`;
    };
    img.onerror = () => {
      if (fallback) btn.style.backgroundImage = `url('${fallback}')`;
    };
    img.src = local;
  });
});
