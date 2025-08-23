import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageAnimation from '../animations/usePageAnimation';
import './Experience.css';
import '../animations/animations.css';

const Experience = () => {
  const { t, language } = useLanguage();
  const animationRef = usePageAnimation('experience');
  const experiences = [
    {
      id: "junapay",
      title: "JunaPay - Plateforme de Paiement Mobile Sécurisée",
      period: "Depuis juin 2025",
      location: "Douala, Cameroun",
      description: "Solution de paiement mobile haute sécurité pour l'Afrique francophone",
      technologies: ["Java Spring Boot", "Flutter", "React", "Angular", "MySQL"],
      achievements: [
        "Backend API REST avec Java Spring Boot",
        "Application mobile Flutter cross-platform (iOS/Android)",
        "Site vitrine React pour utilisateurs finaux",
        "Dashboard d'administration Angular avec monitoring temps réel"
      ],
      screenshots: [
        "/assets/API.png",
        "/assets/API 2.png",
        "/assets/Desktop.png"
      ],
      gitlabUrl: "https://gitlab.com/juna-pay",
      hasDemo: true,
      demoUrl: "https://www.juna-pay.fr",
      client: "JunaPay Technologies"
    },
    {
      id: "estlc-inscription",
      title: "Système d'Inscription Universitaire",
      period: "Mai 2024 - Août 2024",
      location: "ESTLC Ecole Supérieure de Transport, Logistique et Commerce",
      client: "ESTLC Ecole Supérieure de Transport, Logistique et Commerce (Cameroun)",
      description: "Digitalisation du processus d'inscription pour 5000+ candidats annuels",
      technologies: ["Spring Boot", "MySQL", "JavaMail API", "JWT"],
      achievements: [
        "Architecture microservices réduisant le temps de traitement de 70%",
        "15+ endpoints REST API sécurisés avec authentification JWT",
        "Système de notification automatique avec 98% de taux de délivrabilité",
        "Optimisation des requêtes MySQL réduisant la latence de 40%"
      ],
      screenshots: [
        "/assets/Web 1.png",
        "/assets/Web 2.png",
        "/assets/Web 3.png"
      ],
      gitlabUrl: "https://gitlab.com/JasonKamsu/estlc-inscription",
      hasDemo: false,
      demoUrl: null
    },
    {
      id: "genyshop",
      title: "GenyShop - Application Mobile de Vente en Ligne",
      period: "Mars 2023 - Août 2023",
      location: "Douala, Cameroun",
      client: "ChickDev Douala",
      description: "Application e-commerce complète avec analyse fonctionnelle et technique",
      technologies: ["Spring Boot", "Angular 15", "Flutter", "MySQL", "Docker"],
      achievements: [
        "Analyse fonctionnelle et technique avec diagrammes UML via Visual Paradigm",
        "Base de données SQL optimisée avec 15+ tables relationnelles",
        "Backend microservices avec Spring Boot",
        "APIs RESTful documentées avec Swagger"
      ],
      screenshots: [
        "/assets/Desktop 2.png",
        "/assets/Desktop 3.png",
        "/assets/Desktop 4.png"
      ],
      gitlabUrl: "https://gitlab.com/JasonKamsu/genyshop",
      hasDemo: true,
      demoUrl: "https://demo.genyshop.com"
    }
  ];

  return (
    <section className="experience" id="experience" ref={animationRef}>
      <div className="experience-container">
        <h2 className="heading">
          {t('professionalExperience')}
        </h2>
        
        <div className="experience-grid">
          {experiences.map((exp, index) => (
                         <Link 
               key={index} 
               to={`/experience/${exp.id}`}
               className="experience-box clickable-card"
               style={{ textDecoration: 'none' }}
             >
                             <div className="experience-header">
                 <h3>{exp.title}</h3>
                 <span className="period">{exp.period}</span>
               </div>
               
               <div className="experience-location">
                 <MapPin size={16} />
                 <span>{exp.location}</span>
               </div>
               
               <p className="description">{exp.description}</p>
               
               <div className="tech-stack">
                 {exp.technologies.slice(0, 3).map((tech, techIndex) => (
                   <span key={techIndex} className="tech-tag">{tech}</span>
                 ))}
                 {exp.technologies.length > 3 && (
                   <span className="tech-tag more">+{exp.technologies.length - 3}</span>
                 )}
               </div>



              {/* Overlay de survol comme dans Portfolio */}
              <div className="experience-layer">
                <div className="experience-layer-content">
                  <h4>{exp.title}</h4>
                  <p>{language === 'fr' ? 'Cliquez pour voir les détails complets' : 'Click to view full details'}</p>
                  <div className="experience-layer-icon">
                    <Image size={32} />
                  </div>
                </div>
              </div>

              {/* Indicateur de cliquabilité pour les cartes */}
              <div className="click-hint-card">
                <span className="click-indicator-card">👆</span>
                {language === 'fr' ? 'Cliquer pour plus de détails' : 'Click for more details'}
                             </div>
             </Link>
           ))}
        </div>
      </div>


    </section>
  );
};

export default Experience;
