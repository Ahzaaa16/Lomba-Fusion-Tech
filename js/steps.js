// analysis3steps-animation.js
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'analysis3steps-background-canvas';
    
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
    
    // Add canvas to the analysis section
    const analysisSection = document.querySelector('.analysis3steps-container');
    analysisSection.style.position = 'relative'; // Ensure positioning context
    analysisSection.insertBefore(canvas, analysisSection.firstChild);
    
    // Setup canvas
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
      canvas.width = analysisSection.offsetWidth;
      canvas.height = analysisSection.offsetHeight;
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
        this.color = '#3385ff'; // Blue color for particles
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
    const particleCount = 30;
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
            ctx.strokeStyle = '#3385ff';
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
    
    analysisSection.addEventListener('mousemove', function(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    });
    
    analysisSection.addEventListener('mouseleave', function() {
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