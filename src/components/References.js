import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Dumbbell, Music, Heart } from 'lucide-react';
import usePageAnimation from '../animations/usePageAnimation';
import './References.css';
import '../animations/animations.css';

const References = () => {
  const { t } = useLanguage();
  const animationRef = usePageAnimation('references');

  const references = [
    {
      name: "Erwan NAM HEEJ",
      title: "Responsable pole developpement  , Akto Paris 19 eme ",
      email: "erwan.nam-hee@akto.fr"
    }
  ];

  const interests = [
    {
      icon: <Dumbbell size={32} />,
      title: "Basket & Football",
      description: t('isFrench') ? 
        "Esprit d'équipe et stratégie. Entraînement physique discipline et persévérance." :
        "Team spirit and strategy. Physical training discipline and perseverance."
    },
    {
      icon: <Music size={32} />,
      title: "Musique",
      description: t('isFrench') ? 
        "Créativité et expression" :
        "Creativity and expression"
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
    <section className="references" id="references" ref={animationRef}>
      <motion.div
        className="references-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="heading">
          {t('referencesAndInterests')} <span>{t('isFrench') ? 'Références' : 'References'}</span>
        </h2>

        <div className="references-content">
          <motion.div className="references-section" variants={itemVariants}>
            <h3 className="section-title">
              <Mail size={24} />
              {t('referencesSection')}
            </h3>
            
            <div className="references-grid">
              {references.map((ref, index) => (
                <div key={index} className="reference-card">
                  <h4>{ref.name}</h4>
                  <p className="reference-title">{ref.title}</p>
                  <a href={`mailto:${ref.email}`} className="reference-email">
                    {ref.email}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="interests-section" variants={itemVariants}>
            <h3 className="section-title">
              <Heart size={24} />
              {t('interests')}
            </h3>
            
            <div className="interests-grid">
              {interests.map((interest, index) => (
                <div key={index} className="interest-card">
                  <div className="interest-icon">
                    {interest.icon}
                  </div>
                  <h4>{interest.title}</h4>
                  <p>{interest.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default References;
