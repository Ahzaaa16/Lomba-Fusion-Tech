document.addEventListener('DOMContentLoaded', function() {
    const networkGlobe = document.querySelector('.gtc-network-globe');

    function createNetworkEffect() {
        networkGlobe.innerHTML = '';

        const canvas = document.createElement('canvas');
        canvas.classList.add('gtc-network-canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        networkGlobe.appendChild(canvas);

        canvas.width = networkGlobe.offsetWidth;
        canvas.height = networkGlobe.offsetHeight;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 35;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1.5, // Perbesar ukuran partikel
                color: `rgba(51, 143, 238, ${Math.random() * 2.7 + 0.3})`, // Lebih terang
                speedX: (Math.random() - 0.5) * 1.2, // Percepat gerakan
                speedY: (Math.random() - 0.5) * 1.2
            });
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];

                // Efek glow    
                ctx.shadowColor = p.color;

                // Gambar partikel
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Garis koneksi
                for (let j = i + 1; j < particleCount; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(51, 143, 238, ${0.2 - distance / 600})`; // Warna lebih jelas
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Update posisi
                p.x += p.speedX;
                p.y += p.speedY;

                // Bouncing di tepi
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            }
        }

        animate();
    }

    createNetworkEffect();

    window.addEventListener('resize', createNetworkEffect);

    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

        networkGlobe.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
