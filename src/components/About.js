import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle, Briefcase, Code } from 'lucide-react';
import './About.css';

const About = () => {
  const { t } = useLanguage();

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
    <section className="about" id="about">
      <motion.div 
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="about-img" variants={itemVariants}>
          <div className="about-image-container">
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=600&fit=crop" 
              alt="Développement Web" 
            />
            <div className="about-overlay">
              <div className="experience-years">
                <span className="years">3+</span>
                <span className="label">{t('yearsExperience')}</span>
              </div>
            </div>
          </div>
          
          <div className="tech-stats">
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">{t('projectsCompleted')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">{t('technologiesMastered')}</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="about-content" variants={itemVariants}>
          <h2 className="heading">
            {t('aboutMe')} <span>{t('isFrench') ? 'Moi' : 'Me'}</span>
          </h2>
          
          <h3>{t('passionateDeveloper')}</h3>
          
          <p>{t('aboutDescription')}</p>
          
          <div className="about-features">
            <div className="feature-item">
              <CheckCircle size={20} />
              <span>
                {t('isFrench') ? 
                  'Développement Full-Stack avec Java Spring Boot et React' :
                  'Full-Stack development with Java Spring Boot and React'
                }
              </span>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} />
              <span>
                {t('isFrench') ? 
                  'Architecture microservices et API REST' :
                  'Microservices architecture and REST APIs'
                }
              </span>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} />
              <span>
                {t('isFrench') ? 
                  'Gestion de projet Agile Scrum' :
                  'Agile Scrum project management'
                }
              </span>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} />
              <span>
                {t('isFrench') ? 
                  'Tests automatisés et CI/CD' :
                  'Automated testing and CI/CD'
                }
              </span>
            </div>
          </div>
          
          <div className="about-actions">
            <a href="#experience" className="btn">
              <Briefcase size={20} />
              <span>
                {t('isFrench') ? 'Voir mes expériences' : 'View my experiences'}
              </span>
            </a>
            <a href="#skills" className="btn secondary">
              <Code size={20} />
              <span>
                {t('isFrench') ? 'Mes compétences' : 'My skills'}
              </span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
