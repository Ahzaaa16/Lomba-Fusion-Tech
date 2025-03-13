// neovis-animation.js
document.addEventListener('DOMContentLoaded', function() {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'neovis-background-canvas';
  
  // Set canvas styles
  Object.assign(canvas.style, {
    position: 'absolute',
    top: '0',
    left: '0',  
    width: '100%',
    height: '100%',
    zIndex: '1',
    pointerEvents: 'none', // Make sure it doesn't interfere with clicks
    opacity: '100%'
  });
  
  // Add canvas to the about section
  const aboutSection = document.querySelector('.neovis-about-section');
  aboutSection.style.position = 'relative'; // Ensure positioning context
  aboutSection.insertBefore(canvas, aboutSection.firstChild);
  
  // Setup canvas
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  function resizeCanvas() {
    canvas.width = aboutSection.offsetWidth;
    canvas.height = aboutSection.offsetHeight;
  }
  
  // Call resize initially and on window resize
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = '#338FEE'; // Match your highlight color
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      
      // Random direction changes
      if (Math.random() < 0.01) {
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  
  // Create particles
  const particleCount = 50;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Create connecting lines between nearby particles
  function connectParticles() {
    const maxDistance = 100;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = '#338FEE';
          ctx.globalAlpha = 0.1 * (1 - distance/maxDistance);
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }
  
  // Mouse interaction
  let mouse = {
    x: null,
    y: null,
    radius: 100
  };
  
  aboutSection.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  });
  
  aboutSection.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
  });
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
      
      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          
          particle.x += forceDirectionX * force;
          particle.y += forceDirectionY * force;
        }
      }
    });
    
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  animate();
});