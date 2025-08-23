import React, { useEffect, useRef } from 'react';

class AnimationManager {
  constructor() {
    this.animations = new Map();
    this.isActive = false;
    this.animationFrame = null;
  }

  // Animation pour la page d'accueil - Particules flottantes avec connexions et effets de développement
  createHomeAnimation(containerRef) {
    if (!containerRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);

    let particles = [];
    let connections = [];
    let techIcons = [];
    let mouse = { x: 0, y: 0 };

    // Configuration
    const config = {
      particleCount: 100,
      connectionDistance: 180,
      particleSpeed: 0.4,
      connectionOpacity: 0.15,
      particleSize: { min: 1, max: 5 }
    };

    // Classe Particule améliorée
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
        this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.color = `rgba(0, 239, 255, ${this.opacity})`;
        this.originalSize = this.size;
        this.targetSize = this.size;
        this.pulse = 0;
        this.pulseSpeed = Math.random() * 0.1 + 0.05;
      }

      update() {
        // Mouvement
        this.x += this.vx;
        this.y += this.vy;

        // Rebond sur les bords
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;

        // Interaction avec la souris
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          this.targetSize = this.originalSize * 2.5;
          this.vx += (dx / distance) * 0.15;
          this.vy += (dy / distance) * 0.15;
        } else {
          this.targetSize = this.originalSize;
        }

        // Animation de taille
        this.size += (this.targetSize - this.size) * 0.1;
        
        // Pulsation
        this.pulse += this.pulseSpeed;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (0.8 + 0.2 * Math.sin(this.pulse));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Classe Icône technologique
    class TechIcon {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 20 + 15;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.symbols = ['☕', '⚛️', '🔷', '🍃', '💻', '🚀', '⚡', '🔒'];
        this.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = `rgba(0, 239, 255, ${this.opacity})`;
        ctx.fillText(this.symbol, -this.size/2, this.size/2);
        ctx.restore();
      }
    }

    // Création des particules
    const createParticles = () => {
      particles = Array.from({ length: config.particleCount }, () => new Particle());
    };

    // Création des icônes technologiques
    const createTechIcons = () => {
      techIcons = Array.from({ length: 15 }, () => new TechIcon());
    };

    // Gestion des connexions
    const updateConnections = () => {
      connections = [];
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.connectionDistance) {
            connections.push({
              from: particle,
              to: otherParticle,
              opacity: (1 - distance / config.connectionDistance) * config.connectionOpacity
            });
          }
        });
      });
    };

    // Animation principale
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Mise à jour des connexions
      updateConnections();
      
      // Dessin des connexions
      connections.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.strokeStyle = `rgba(0, 239, 255, ${connection.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Mise à jour et dessin des particules
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Mise à jour et dessin des icônes technologiques
      techIcons.forEach(icon => {
        icon.update();
        icon.draw();
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    // Gestion du redimensionnement
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Gestion de la souris
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Initialisation
    resizeCanvas();
    createParticles();
    createTechIcons();
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }

  // Animation pour la page Portfolio - Grille dynamique avec effets de parallaxe
  createPortfolioAnimation(containerRef) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cards = container.querySelectorAll('.portfolio-item');
    
    let scrollY = 0;
    let ticking = false;

    // Animation d'entrée des cartes
    const animateCards = () => {
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const progress = Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.8));
          const scale = 0.8 + (progress * 0.2);
          const opacity = progress;
          const translateY = (1 - progress) * 50;
          
          card.style.transform = `translateY(${translateY}px) scale(${scale})`;
          card.style.opacity = opacity;
          card.style.filter = `blur(${(1 - progress) * 5}px)`;
        }
      });
    };

    // Effet de parallaxe au scroll
    const handleScroll = () => {
      scrollY = window.pageYOffset;
      if (!ticking) {
        requestAnimationFrame(() => {
          animateCards();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Animation des cartes au survol
    const handleCardHover = (card) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        card.style.boxShadow = '0 20px 40px rgba(0, 239, 255, 0.3)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
      });
    };

    // Initialisation
    cards.forEach(handleCardHover);
    window.addEventListener('scroll', handleScroll);
    animateCards();

    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }

  // Animation pour la page Experience - Timeline dynamique avec particules
  createExperienceAnimation(containerRef) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const timeline = document.createElement('div');
    timeline.className = 'experience-timeline';
    timeline.style.cssText = `
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, transparent, #00d4ff, transparent);
      transform: translateX(-50%);
      z-index: 1;
    `;
    
    container.appendChild(timeline);

    // Particules flottantes autour de la timeline
    const createTimelineParticles = () => {
      const particles = [];
      const particleCount = 20;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'timeline-particle';
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00d4ff;
          border-radius: 50%;
          left: 50%;
          transform: translateX(-50%);
          animation: float 3s ease-in-out infinite;
          animation-delay: ${i * 0.15}s;
        `;
        
        const top = (i / particleCount) * 100;
        particle.style.top = `${top}%`;
        
        container.appendChild(particle);
        particles.push(particle);
      }
      
      return particles;
    };

    // Animation des cartes d'expérience
    const animateExperienceCards = () => {
      const cards = container.querySelectorAll('.experience-box');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0) scale(1)';
              entry.target.style.filter = 'blur(0px)';
            }, index * 200);
          }
        });
      }, { threshold: 0.1 });

      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.filter = 'blur(5px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
      });
    };

    // Création des particules
    const particles = createTimelineParticles();
    animateExperienceCards();

    // Nettoyage
    return () => {
      if (container.contains(timeline)) {
        container.removeChild(timeline);
      }
      particles.forEach(particle => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
    };
  }

  // Animation pour la page Services - Ondes et particules interactives
  createServicesAnimation(containerRef) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);

    let waves = [];
    let particles = [];
    let mouse = { x: 0, y: 0 };

    // Configuration des ondes
    const createWaves = () => {
      waves = [
        { y: 0, amplitude: 50, frequency: 0.02, speed: 0.5, color: 'rgba(0, 239, 255, 0.1)' },
        { y: 0, amplitude: 30, frequency: 0.03, speed: 0.3, color: 'rgba(0, 212, 255, 0.08)' },
        { y: 0, amplitude: 40, frequency: 0.025, speed: 0.4, color: 'rgba(0, 150, 255, 0.06)' }
      ];
    };

    // Classe Particule pour les services
    class ServiceParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = `rgba(0, 239, 255, ${this.opacity})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Création des particules
    const createParticles = () => {
      particles = Array.from({ length: 30 }, () => new ServiceParticle());
    };

    // Animation des ondes
    const animateWaves = () => {
      waves.forEach(wave => {
        wave.y += wave.speed;
        if (wave.y > canvas.height) wave.y = 0;
      });
    };

    // Dessin des ondes
    const drawWaves = () => {
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        
        for (let x = 0; x < canvas.width; x++) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.y * 0.01) * wave.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    // Animation principale
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      animateWaves();
      drawWaves();
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    // Gestion du redimensionnement
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Initialisation
    resizeCanvas();
    createWaves();
    createParticles();
    
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }

  // Animation pour la page ProjectDetail - Effets de développement et architecture
  createProjectDetailAnimation(containerRef) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);

    let particles = [];
    let architectureLines = [];
    let mouse = { x: 0, y: 0 };

    // Classe Particule d'architecture
    class ArchitectureParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(0, 239, 255, ${this.opacity})`;
        this.connectionRadius = 80;
        this.connections = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      drawConnections(otherParticles) {
        otherParticles.forEach(other => {
          const dx = this.x - other.x;
          const dy = this.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.connectionRadius && distance > 0) {
            const opacity = (1 - distance / this.connectionRadius) * 0.3;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 239, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }
    }

    // Création des particules d'architecture
    const createArchitectureParticles = () => {
      particles = Array.from({ length: 35 }, () => new ArchitectureParticle());
    };

    // Création des lignes d'architecture
    const createArchitectureLines = () => {
      architectureLines = [];
      const symbols = ['⚡', '🔗', '📊', '🔄', '🛡️', '🚀', '💾', '🌐'];
      
      for (let i = 0; i < 12; i++) {
        architectureLines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          opacity: Math.random() * 0.4 + 0.2,
          size: Math.random() * 16 + 12,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4
        });
      }
    };

    // Animation des lignes d'architecture
    const animateArchitectureLines = () => {
      architectureLines.forEach(line => {
        line.x += line.vx;
        line.y += line.vy;
        
        if (line.x <= 0 || line.x >= canvas.width) line.vx *= -1;
        if (line.y <= 0 || line.y >= canvas.height) line.vy *= -1;
      });
    };

    // Dessin des lignes d'architecture
    const drawArchitectureLines = () => {
      architectureLines.forEach(line => {
        ctx.font = `${line.size}px Arial`;
        ctx.fillStyle = `rgba(0, 239, 255, ${line.opacity})`;
        ctx.fillText(line.symbol, line.x, line.y);
      });
    };

    // Gestion de la souris
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Animation principale
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner les connexions entre particules
      particles.forEach(particle => {
        particle.drawConnections(particles);
      });
      
      // Dessiner les particules
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animateArchitectureLines();
      drawArchitectureLines();

      this.animationFrame = requestAnimationFrame(animate);
    };

    // Gestion du redimensionnement
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Initialisation
    resizeCanvas();
    createArchitectureParticles();
    createArchitectureLines();
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }

  // Animation pour la page ExperienceDetail - Particules de code et effets de développement
  createExperienceDetailAnimation(containerRef) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);

    let particles = [];
    let codeLines = [];
    let mouse = { x: 0, y: 0 };

    // Classe Particule de code
    class CodeParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.color = `rgba(0, 239, 255, ${this.opacity})`;
        this.type = Math.random() > 0.5 ? 'dot' : 'square';
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        if (this.type === 'dot') {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        } else {
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
        }
        
        ctx.restore();
      }
    }

    // Création des particules de code
    const createCodeParticles = () => {
      particles = Array.from({ length: 40 }, () => new CodeParticle());
    };

    // Création des lignes de code flottantes
    const createCodeLines = () => {
      codeLines = [];
      const symbols = ['{', '}', '[', ']', '<', '>', '/', '*', '+', '-', '=', ';'];
      
      for (let i = 0; i < 15; i++) {
        codeLines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          opacity: Math.random() * 0.3 + 0.1,
          size: Math.random() * 12 + 8,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3
        });
      }
    };

    // Animation des lignes de code
    const animateCodeLines = () => {
      codeLines.forEach(line => {
        line.x += line.vx;
        line.y += line.vy;
        
        if (line.x <= 0 || line.x >= canvas.width) line.vx *= -1;
        if (line.y <= 0 || line.y >= canvas.height) line.vy *= -1;
      });
    };

    // Dessin des lignes de code
    const drawCodeLines = () => {
      codeLines.forEach(line => {
        ctx.font = `${line.size}px monospace`;
        ctx.fillStyle = `rgba(0, 239, 255, ${line.opacity})`;
        ctx.fillText(line.symbol, line.x, line.y);
      });
    };

    // Gestion de la souris
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Animation principale
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animateCodeLines();
      drawCodeLines();

      this.animationFrame = requestAnimationFrame(animate);
    };

    // Gestion du redimensionnement
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Initialisation
    resizeCanvas();
    createCodeParticles();
    createCodeLines();
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }

  // Animation pour la page Skills - Particules de compétences et effets de développement
  createSkillsAnimation(containerRef) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);

    let particles = [];
    let skillIcons = [];
    let mouse = { x: 0, y: 0 };

    // Classe Particule de compétence
    class SkillParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(0, 239, 255, ${this.opacity})`;
        this.type = Math.random() > 0.7 ? 'star' : 'circle';
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        if (this.type === 'star') {
          this.drawStar();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
        
        ctx.restore();
      }

      drawStar() {
        const spikes = 5;
        const outerRadius = this.size;
        const innerRadius = this.size * 0.5;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const angle = (i * Math.PI) / spikes;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Classe Icône de compétence
    class SkillIcon {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 18 + 12;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.symbols = ['💻', '⚡', '🔧', '🚀', '🛡️', '📊', '🌐', '🔒', '⚙️', '🎯'];
        this.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        this.bounce = 0;
        this.bounceSpeed = Math.random() * 0.1 + 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.bounce += this.bounceSpeed;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        const bounceOffset = Math.sin(this.bounce) * 3;
        ctx.translate(this.x, this.y + bounceOffset);
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = `rgba(0, 239, 255, ${this.opacity})`;
        ctx.fillText(this.symbol, -this.size/2, this.size/2);
        ctx.restore();
      }
    }

    // Création des particules de compétence
    const createSkillParticles = () => {
      particles = Array.from({ length: 45 }, () => new SkillParticle());
    };

    // Création des icônes de compétence
    const createSkillIcons = () => {
      skillIcons = Array.from({ length: 18 }, () => new SkillIcon());
    };

    // Gestion de la souris
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Animation principale
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Mise à jour et dessin des particules
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Mise à jour et dessin des icônes
      skillIcons.forEach(icon => {
        icon.update();
        icon.draw();
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    // Gestion du redimensionnement
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Initialisation
    resizeCanvas();
    createSkillParticles();
    createSkillIcons();
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }

  // Animation pour la page References - Particules de réseau et connexions
  createReferencesAnimation(containerRef) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);

    let particles = [];
    let networkNodes = [];
    let mouse = { x: 0, y: 0 };

    // Classe Particule de réseau
    class NetworkParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.color = `rgba(0, 239, 255, ${this.opacity})`;
        this.connectionRadius = 100;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      drawConnections(otherParticles) {
        otherParticles.forEach(other => {
          const dx = this.x - other.x;
          const dy = this.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.connectionRadius && distance > 0) {
            const opacity = (1 - distance / this.connectionRadius) * 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 239, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }
    }

    // Classe Nœud de réseau
    class NetworkNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 20 + 15;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.symbols = ['👥', '🤝', '💼', '📧', '🔗', '🌍', '💡', '⭐'];
        this.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        this.pulse = 0;
        this.pulseSpeed = Math.random() * 0.1 + 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        const pulseScale = 1 + Math.sin(this.pulse) * 0.1;
        ctx.translate(this.x, this.y);
        ctx.scale(pulseScale, pulseScale);
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = `rgba(0, 239, 255, ${this.opacity})`;
        ctx.fillText(this.symbol, -this.size/2, this.size/2);
        ctx.restore();
      }
    }

    // Création des particules de réseau
    const createNetworkParticles = () => {
      particles = Array.from({ length: 50 }, () => new NetworkParticle());
    };

    // Création des nœuds de réseau
    const createNetworkNodes = () => {
      networkNodes = Array.from({ length: 12 }, () => new NetworkNode());
    };

    // Gestion de la souris
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Animation principale
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner les connexions entre particules
      particles.forEach(particle => {
        particle.drawConnections(particles);
      });
      
      // Mise à jour et dessin des particules
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Mise à jour et dessin des nœuds
      networkNodes.forEach(node => {
        node.update();
        node.draw();
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    // Gestion du redimensionnement
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Initialisation
    resizeCanvas();
    createNetworkParticles();
    createNetworkNodes();
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }

  // Animation pour la page About - Particules de profil et statistiques
  createAboutAnimation(containerRef) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);

    let particles = [];
    let profileElements = [];
    let mouse = { x: 0, y: 0 };

    // Classe Particule de profil
    class ProfileParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(0, 239, 255, ${this.opacity})`;
        this.shape = Math.random() > 0.5 ? 'circle' : 'diamond';
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        if (this.shape === 'diamond') {
          this.drawDiamond();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
        
        ctx.restore();
      }

      drawDiamond() {
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size, 0);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Classe Élément de profil
    class ProfileElement {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.size = Math.random() * 16 + 12;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.symbols = ['👨‍💻', '📚', '🎯', '🚀', '💡', '🔍', '📊', '🌟', '🎨', '⚡'];
        this.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        this.float = 0;
        this.floatSpeed = Math.random() * 0.08 + 0.04;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.float += this.floatSpeed;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        const floatOffset = Math.sin(this.float) * 4;
        ctx.translate(this.x, this.y + floatOffset);
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = `rgba(0, 239, 255, ${this.opacity})`;
        ctx.fillText(this.symbol, -this.size/2, this.size/2);
        ctx.restore();
      }
    }

    // Création des particules de profil
    const createProfileParticles = () => {
      particles = Array.from({ length: 40 }, () => new ProfileParticle());
    };

    // Création des éléments de profil
    const createProfileElements = () => {
      profileElements = Array.from({ length: 15 }, () => new ProfileElement());
    };

    // Gestion de la souris
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Animation principale
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Mise à jour et dessin des particules
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Mise à jour et dessin des éléments
      profileElements.forEach(element => {
        element.update();
        element.draw();
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    // Gestion du redimensionnement
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Initialisation
    resizeCanvas();
    createProfileParticles();
    createProfileElements();
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }

  // Animation pour la page Contact - Particules magnétiques
  createContactAnimation(containerRef) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);

    let particles = [];
    let mouse = { x: 0, y: 0 };

    // Classe Particule magnétique
    class MagneticParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 4 + 2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(0, 239, 255, ${this.opacity})`;
        this.originalX = this.x;
        this.originalY = this.y;
      }

      update() {
        // Attraction magnétique vers la souris
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          this.vx += (dx / distance) * force * 0.1;
          this.vy += (dy / distance) * force * 0.1;
        }

        // Retour vers la position originale
        const dxOrig = this.originalX - this.x;
        const dyOrig = this.originalY - this.y;
        this.vx += dxOrig * 0.001;
        this.vy += dyOrig * 0.001;

        // Friction
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Mise à jour de la position
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Création des particules
    const createParticles = () => {
      particles = Array.from({ length: 60 }, () => new MagneticParticle());
    };

    // Gestion de la souris
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Animation principale
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    // Gestion du redimensionnement
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Initialisation
    resizeCanvas();
    createParticles();
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }

  // Méthode pour démarrer l'animation selon la page
  startAnimation(pageName, containerRef) {
    this.stopAnimation();
    
    switch (pageName) {
      case 'home':
        return this.createHomeAnimation(containerRef);
      case 'portfolio':
        return this.createPortfolioAnimation(containerRef);
      case 'experience':
        return this.createExperienceAnimation(containerRef);
      case 'experience-detail':
        return this.createExperienceDetailAnimation(containerRef);
      case 'project-detail':
        return this.createProjectDetailAnimation(containerRef);
      case 'services':
        return this.createServicesAnimation(containerRef);
      case 'skills':
        return this.createSkillsAnimation(containerRef);
      case 'references':
        return this.createReferencesAnimation(containerRef);
      case 'about':
        return this.createAboutAnimation(containerRef);
      case 'contact':
        return this.createContactAnimation(containerRef);
      default:
        return this.createHomeAnimation(containerRef);
    }
  }

  // Méthode pour arrêter l'animation
  stopAnimation() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}

export default AnimationManager;
