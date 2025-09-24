import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Download, MessageCircle, Github, Linkedin, Gitlab } from 'lucide-react';
import usePageAnimation from '../animations/usePageAnimation';
import './Home.css';
import '../animations/animations.css';

const Home = () => {
  const { t } = useLanguage();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const animationRef = usePageAnimation('home');
  
  const texts = useLanguage().isFrench ? [
    'Développeur Full-Stack',
    'Architecte Logiciel',
    'Spécialiste Java Spring',
    'Expert React & Angular',
    'Passionné d\'Innovation'
  ] : [
    'Full-Stack Developer',
    'Software Architect',
    'C# Specialist',
    'React & Angular Expert',
    'Innovation Enthusiast'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [texts.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const techIcons = [
    { name: 'Java', icon: '☕', delay: 0 },
    { name: 'Spring', icon: '🍃', delay: 0.5 },
    { name: 'React', icon: '⚛️', delay: 1 },
    { name: '.NET', icon: '🔷', delay: 1.5 }
  ];

  return (
    <section className="home" id="home" ref={animationRef}>
      <motion.div 
        className="home-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3 variants={itemVariants}>
          {t('hello')}
        </motion.h3>
        
        <motion.h1 variants={itemVariants}>
          Nthiekam William
        </motion.h1>
        
        <motion.h3 variants={itemVariants}>
          {t('andIAm')} <span className="typing-text">{texts[currentTextIndex]}</span>
        </motion.h3>
        
        <motion.p variants={itemVariants}>
          {useLanguage().isFrench ? 
            'Développeur Full-Stack passionné par la création d\'applications innovantes et la résolution de défis techniques complexes. Spécialisé dans les technologies modernes et l\'architecture logicielle.' :
            'Full-Stack Developer passionate about creating innovative applications and solving complex technical challenges. Specialized in modern technologies and software architecture.'
          }
        </motion.p>

        <motion.div className="social-media" variants={itemVariants}>
          <a href="https://www.linkedin.com/in/william-nthiekam-05b3b3280/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/Nthiekamw" target="_blank" rel="noopener noreferrer">
            <Github size={24} />
          </a>
          <a href="https://gitlab.com/NthiekamWilliam" target="_blank" rel="noopener noreferrer">
            <Gitlab size={24} />
          </a>
        </motion.div>

        <motion.div className="home-buttons" variants={itemVariants}>
          <a href="/assets/CV.pdf" className="btn primary" download>
            <Download size={20} />
            <span>{t('downloadCV')}</span>
          </a>
          <Link to="/contact" className="btn secondary">
            <MessageCircle size={20} />
            <span>{t('contactMe')}</span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="home-img"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="profile-container">
          <img src="/assets/Profil.jpg" alt="Nthiekam William" />
          <div className="profile-glow"></div>
        </div>
        
        <div className="tech-icons">
          {techIcons.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="tech-icon"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: tech.delay,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="tech-emoji">{tech.icon}</span>
              <span className="tech-name">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Home; // Nthiekam William
