import React, { useEffect, useRef } from 'react';
import './MorphingShapes.css';

const MorphingShapes = () => {
  const containerRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Créer des formes morphantes
    const createShape = (index) => {
      const shape = document.createElement('div');
      shape.className = 'morphing-shape';
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.animationDelay = `${index * 0.5}s`;
      shape.style.animationDuration = `${8 + Math.random() * 4}s`;
      
      // Couleurs aléatoires dans la palette cyan
      const colors = [
        'rgba(0, 239, 255, 0.1)',
        'rgba(0, 150, 255, 0.1)',
        'rgba(0, 200, 255, 0.1)',
        'rgba(50, 255, 200, 0.1)'
      ];
      shape.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(shape);
      return shape;
    };

    // Créer plusieurs formes
    for (let i = 0; i < 5; i++) {
      shapesRef.current.push(createShape(i));
    }

    // Animation de déplacement aléatoire
    const animateShapes = () => {
      shapesRef.current.forEach((shape, index) => {
        const x = Math.sin(Date.now() * 0.001 + index) * 50;
        const y = Math.cos(Date.now() * 0.0015 + index) * 30;
        shape.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.sin(Date.now() * 0.002 + index) * 0.2})`;
      });
      requestAnimationFrame(animateShapes);
    };

    animateShapes();

    return () => {
      shapesRef.current.forEach(shape => {
        if (shape.parentNode) {
          shape.parentNode.removeChild(shape);
        }
      });
      shapesRef.current = [];
    };
  }, []);

  return <div ref={containerRef} className="morphing-container" />;
};

export default MorphingShapes;
