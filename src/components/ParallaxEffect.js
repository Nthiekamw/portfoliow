import React, { useEffect, useRef } from 'react';
import './ParallaxEffect.css';

const ParallaxEffect = ({ children, speed = 0.5, className = '' }) => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;

      const scrolled = window.pageYOffset;
      const element = parallaxRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculer si l'élément est visible
      const isVisible = (elementTop < scrolled + windowHeight) && (elementTop + elementHeight > scrolled);

      if (isVisible) {
        const yPos = -(scrolled - elementTop) * speed;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    // Utiliser requestAnimationFrame pour des performances optimales
    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    handleScroll(); // Appel initial

    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, [speed]);

  return (
    <div ref={parallaxRef} className={`parallax-element ${className}`}>
      {children}
    </div>
  );
};

// Hook pour créer des effets de parallax avancés
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;

      // Effet de parallax avec rotation et scale
      if (elementTop < scrolled + windowHeight && elementTop + rect.height > scrolled) {
        const progress = (scrolled - elementTop + windowHeight) / (windowHeight + rect.height);
        const yPos = -(scrolled - elementTop) * speed;
        const rotation = progress * 10 - 5; // Rotation de -5° à 5°
        const scale = 1 + progress * 0.1; // Scale de 1 à 1.1

        element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg) scale(${scale})`;
      }
    };

    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, [speed]);

  return ref;
};

// Composant pour les éléments flottants
export const FloatingElement = ({ children, intensity = 1, duration = 3 }) => {
  const floatingRef = useRef(null);

  useEffect(() => {
    const element = floatingRef.current;
    if (!element) return;

    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;

      const x = Math.sin(elapsed * (2 * Math.PI / duration)) * intensity * 10;
      const y = Math.cos(elapsed * (2 * Math.PI / (duration * 1.5))) * intensity * 5;
      const rotation = Math.sin(elapsed * (2 * Math.PI / (duration * 2))) * intensity * 2;

      element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [intensity, duration]);

  return (
    <div ref={floatingRef} className="floating-element">
      {children}
    </div>
  );
};

export default ParallaxEffect;
