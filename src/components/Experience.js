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
      id: "trip-application",
      title: "Trip - Application de Paiement Mobile",
      period: "Depuis juin 2025",
      location: "Douala, Cameroun",
      description: "Solution de paiement mobile sécurisée avec Flutter, NW et Firebase",
      technologies: ["NW", "Flutter", "Firebase", "React", "MySQL"],
      achievements: [
        "Backend API REST avec NW et Express",
        "Application mobile Flutter cross-platform (iOS/Android)",
        "Authentification sécurisée avec Firebase Auth",
        "Gestion des transactions via Firebase Firestore",
        "Dashboard React pour suivi des paiements",
        "Notifications push pour les transactions",
        "Sécurité renforcée avec cryptage AES-256",
        "Pipeline CI/CD GitLab avec déploiement automatisé",
        "Surveillance et logs temps réel",
        "Tests unitaires et e2e automatisés"
      ],
      screenshots: [
        "/assets/Trip1.png",
        "/assets/Trip2.png",
        "/assets/Trip3.png"
      ],
      gitlabUrl: "https://gitlab.com/william-nw/trip-app",
      hasDemo: true,
      demoUrl: "https://www.trip-app.com",
      client: "Trip Technologies"
    },
    {
      id: "inscrip-school",
      title: "Inscrip Plateforme d'Inscription Universitaire",
      period: "Mai 2024 - Août 2024 Vincennes France",
      location: "NTH Ecole Supérieure de Transport, Logistique ",
      client: "NTH Ecole Supérieure de Transport, Logistique et Commerce ",
      description: "Digitalisation du processus d'inscription pour 5000+ candidats annuels",
      technologies: ["NW", "MySQL", "JavaMail API", "JWT"],
      achievements: [
        "Architecture microservices réduisant le temps de traitement de 70%",
        "15+ endpoints REST API sécurisés avec authentification JWT",
        "Système de notification automatique avec 98% de taux de délivrabilité",
        "Optimisation des requêtes MySQL réduisant la latence de 40%"
      ],
      screenshots: [
        "/assets/Web1.png",
        "/assets/Web2.png",
        "/assets/Web3.png"
      ],
      gitlabUrl: "https://gitlab.com/william-nw/estlc-inscription",
      hasDemo: false,
      demoUrl: null
    },
    {
      id: "thegift",
      title: "TheGift - Application Mobile de Cadeaux",
      period: "Mars 2024 - Août 2025",
      location: "Paris , France",
      client: "F2I Vincennes",
      description: "Application e-commerce pour cadeaux avec gestion mobile et web",
      technologies: ["NW", "Firebase", "Flutter/kotlin", "Docker"],
      achievements: [
        "Analyse fonctionnelle et technique avec diagrammes UML",
        "Base de données SQL optimisée avec 15+ tables relationnelles",
        "Backend microservices avec NW",
        "APIs RESTful documentées avec Swagger"
      ],
      screenshots: [
        "/assets/TheGift1.png",
        "/assets/TheGift2.png",
        "/assets/TheGift3.png"
      ],
      gitlabUrl: null,
      hasDemo: false,
      demoUrl: null
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

export default Experience; // N W - William Nthiekam
