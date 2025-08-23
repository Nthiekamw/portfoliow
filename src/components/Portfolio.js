import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';
import usePageAnimation from '../animations/usePageAnimation';
import './Portfolio.css';
import '../animations/animations.css';

const Portfolio = () => {
  const { t } = useLanguage();
  const animationRef = usePageAnimation('portfolio');

  const projects = [
    {
      title: "Système de Gestion de Parc Informatique",
      description: "Gestion complète du parc informatique avec ASP.NET Core, Blazor Server et WPF",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&crop=center",
      id: "parc-informatique"
    },
    {
      title: "Système de Gestion Café Shop",
      description: "Application full-stack avec Spring Boot et React pour la gestion d'un café",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop&crop=center",
      id: "cafe-shop"
    },
    {
      title: "Application Web E-commerce",
      description: "Site e-commerce complet avec PHP, MySQL et tests automatisés Selenium",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
      id: "ecommerce"
    }
  ];

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

  return (
    <section className="portfolio" id="portfolio" ref={animationRef}>
      <motion.div
        className="portfolio-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="heading">
          {t('academicProjects')} <span>{t('isFrench') ? 'Académiques' : 'Academic'}</span>
        </h2>
        
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="portfolio-box"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <img src={project.image} alt={project.title} />
              <div className="portfolio-layer">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <a href={`/project/${project.id}`} className="portfolio-link">
                  <ExternalLink size={24} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Portfolio;
