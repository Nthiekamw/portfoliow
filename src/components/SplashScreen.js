import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [language, setLanguage] = useState('fr'); // Langue par défaut
  const [currentStep, setCurrentStep] = useState(0);

  // Détecter la langue du navigateur
  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
      setLanguage('en');
    }
  }, []);
  const [particles, setParticles] = useState([]);
  const [shapes, setShapes] = useState([]);
  const animationRef = useRef(null);

  const steps = useMemo(() => [
    {
      text: language === 'fr' ? 'Chargement...' : 'Loading...',
      duration: 2000,
      color: '#00d4ff'
    },
    {
      text: language === 'fr' ? 'Initialisation...' : 'Initializing...',
      duration: 2500,
      color: '#ff6b6b'
    },
    {
      text: language === 'fr' ? 'Préparation...' : 'Preparing...',
      duration: 2000,
      color: '#4ecdc4'
    },
    {
      text: language === 'fr' ? 'Démarrage...' : 'Starting...',
      duration: 1500,
      color: '#45b7d1'
    }
  ], [language]);

  // Créer des particules
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    setParticles(newParticles);
  }, []);

  // Créer des formes morphantes
  useEffect(() => {
    const newShapes = [];
    for (let i = 0; i < 8; i++) {
      newShapes.push({
        id: i,
        points: generateRandomPolygon(6 + Math.floor(Math.random() * 4)),
        color: `hsl(${i * 45}, 70%, 60%)`,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      });
    }
    setShapes(newShapes);
  }, []);

  // Animation des particules et formes
  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vx: particle.x < 0 || particle.x > window.innerWidth ? -particle.vx : particle.vx,
        vy: particle.y < 0 || particle.y > window.innerHeight ? -particle.vy : particle.vy
      })));

      setShapes(prev => prev.map(shape => ({
        ...shape,
        rotation: shape.rotation + 0.5,
        scale: shape.scale + Math.sin(Date.now() * 0.001 + shape.id) * 0.01
      })));

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Progression des étapes
  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].duration);

      return () => clearTimeout(timer);
    } else {
      // Animation de fin
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [currentStep, steps, onComplete]);

  const generateRandomPolygon = (sides) => {
    const points = [];
    const radius = 50;
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * 2 * Math.PI;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      points.push({ x, y });
    }
    return points;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 1.2,
      transition: {
        duration: 0.3
      }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="splash-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Particules animées */}
        <div className="particles-container">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: particle.opacity
              }}
            />
          ))}
        </div>

        {/* Formes morphantes */}
        <div className="shapes-container">
          {shapes.map(shape => (
            <svg
              key={shape.id}
              className="morphing-shape"
              style={{
                left: shape.x,
                top: shape.y,
                transform: `rotate(${shape.rotation}deg) scale(${shape.scale})`
              }}
              width="100"
              height="100"
              viewBox="-50 -50 100 100"
            >
              <polygon
                points={shape.points.map(p => `${p.x},${p.y}`).join(' ')}
                fill={shape.color}
                opacity="0.3"
              />
            </svg>
          ))}
        </div>

        {/* Contenu principal */}
        <div className="splash-content">
          {/* Logo animé */}
          <motion.div
            className="logo-container"
            variants={logoVariants}
            animate="visible"
            whileHover="pulse"
          >
            <div className="logo">
              <span className="logo-text">WN</span>
              <div className="logo-glow"></div>
            </div>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            className="main-title"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
          >
            {language === 'fr' ? 'William Nthiekam' : 'William Nthiekam'}
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            className="subtitle"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
          >
            {language === 'fr' 
              ? 'Développeur Full-Stack Passionné' 
              : 'Passionate Full-Stack Developer'
            }
          </motion.p>

          {/* Étapes de chargement */}
          <div className="loading-steps">
            {steps.map((step, index) => (
              <AnimatePresence key={index} mode="wait">
                {currentStep === index && (
                  <motion.div
                    className="loading-step"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ color: step.color }}
                  >
                    {step.text}
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Barre de progression */}
          <div className="progress-container">
            <motion.div
              className="progress-bar"
              variants={progressVariants}
              initial="hidden"
              animate="visible"
              style={{
                background: `linear-gradient(90deg, ${steps[currentStep]?.color || '#00d4ff'}, #00d4ff)`
              }}
            />
          </div>

          {/* Indicateur de progression */}
          <motion.div
            className="progress-text"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
          >
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </motion.div>
        </div>

        {/* Effets de fond */}
        <div className="background-effects">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        {/* Lignes de scan */}
        <div className="scan-lines">
          <div className="scan-line line-1"></div>
          <div className="scan-line line-2"></div>
          <div className="scan-line line-3"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
