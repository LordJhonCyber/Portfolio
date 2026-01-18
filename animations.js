// Adicionar classe de animação aos cards quando scrollarem para visualização
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-sequence');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar cards do projeto
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.setProperty('--delay', `${index * 0.1}s`);
    observer.observe(card);
  });

  // Observar items de experiência
  document.querySelectorAll('.experience-item').forEach((item, index) => {
    item.style.setProperty('--delay', `${index * 0.1}s`);
    observer.observe(item);
  });

  // Criar partículas de efeito ao clicar
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn') || e.target.closest('.contact-link')) {
      createParticles(e.pageX, e.pageY);
    }
  });
});

// Função para criar partículas animadas
function createParticles(x, y) {
  const particles = ['✨', '💫', '⚡'];
  
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 3000);
  }
}

// Animação de contagem regressiva para números
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Efeito de digitação
function typewriterEffect(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';
  
  const type = () => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, speed);
    }
  };
  
  type();
}
