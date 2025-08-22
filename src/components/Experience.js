import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin, X } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const { t, language } = useLanguage();
  const [selectedExperience, setSelectedExperience] = useState(null);

  const experiences = [
    {
      title: "JunaPay - Plateforme de Paiement Mobile Sécurisée",
      period: "Depuis juin 2025",
      location: "Douala, Cameroun",
      description: "Solution de paiement mobile haute sécurité pour l'Afrique francophone",
      technologies: ["Java Spring Boot", "Flutter", "React", "Angular", "MySQL"],
      achievements: [
        "Backend API REST avec Java Spring Boot",
        "Application mobile Flutter cross-platform (iOS/Android)",
        "Site vitrine React pour utilisateurs finaux",
        "Dashboard d'administration Angular avec monitoring temps réel",
        "Authentification multi-facteurs avec JWT et refresh tokens",
        "Chiffrement AES-256 pour transactions financières",
        "Système de détection de fraude avec alertes automatiques",
        "Pipeline CI/CD GitLab avec déploiement automatisé via Jenkins",
        "Surveillance 24/7 avec alertes",
        "Tests de sécurité automatisés (penetration testing)"
      ],
      challenges: language === 'fr' 
        ? "Gestion de la sécurité financière, conformité réglementaire, scalabilité pour des millions d'utilisateurs"
        : "Financial security management, regulatory compliance, scalability for millions of users",
      impact: language === 'fr'
        ? "Réduction de 60% des fraudes, augmentation de 200% du volume de transactions"
        : "60% reduction in fraud, 200% increase in transaction volume"
    },
    {
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
        "Optimisation des requêtes MySQL réduisant la latence de 40%",
        "Méthodologie Agile Scrum avec sprints de 2 semaines",
        "Traitement réussi de 3500 inscriptions en période de pointe"
      ],
      challenges: language === 'fr'
        ? "Gestion de la charge lors des pics d'inscription, intégration avec systèmes existants"
        : "Managing load during enrollment peaks, integrating with existing systems",
      impact: language === 'fr'
        ? "Amélioration de 70% de l'efficacité du processus d'inscription"
        : "70% improvement in enrollment process efficiency"
    },
    {
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
        "APIs RESTful documentées avec Swagger",
        "Interface mobile responsive en Dart (92% de satisfaction utilisateur)",
        "Version web Angular avec gestion d'état Redux",
        "Système de versioning GitLab avec revues de code et intégration continue"
      ],
      challenges: language === 'fr'
        ? "Conception de l'architecture microservices, optimisation des performances"
        : "Designing microservices architecture, performance optimization",
      impact: language === 'fr'
        ? "92% de satisfaction utilisateur, réduction de 40% du temps de chargement"
        : "92% user satisfaction, 40% reduction in loading time"
    }
  ];

  const openExperienceModal = (experience) => {
    console.log('🎯 Opening experience modal for:', experience.title);
    console.log('🎯 Setting selectedExperience to:', experience);
    setSelectedExperience(experience);
    console.log('🎯 State should now be updated');
    
    // Debug: vérifier que le state est bien mis à jour
    setTimeout(() => {
      console.log('🎯 Current selectedExperience state:', selectedExperience);
    }, 100);
  };

  const closeExperienceModal = () => {
    setSelectedExperience(null);
  };

  return (
    <section className="experience" id="experience">
      <div className="experience-container">
        <h2 className="heading">
          {t('professionalExperience')}
        </h2>
        
        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-box">
              <div className="experience-header">
                <h3>{exp.title}</h3>
                <span className="period">{exp.period}</span>
              </div>
              
              <div className="experience-location">
                <MapPin size={16} />
                <span>{exp.location}</span>
              </div>
              
              {exp.client && (
                <div className="client-info">
                  <strong>Client :</strong> {exp.client}
                </div>
              )}
              
              <div className="tech-stack">
                {exp.technologies.slice(0, 4).map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
                {exp.technologies.length > 4 && (
                  <span className="tech-tag more">+{exp.technologies.length - 4}</span>
                )}
              </div>
              
              <p className="description">{exp.description}</p>
              
              <div className="achievements-preview">
                <h4>Réalisations principales :</h4>
                <ul>
                  {exp.achievements.slice(0, 3).map((achievement, achievementIndex) => (
                    <li key={achievementIndex}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <button 
                className="experience-detail-btn"
                onClick={() => openExperienceModal(exp)}
              >
                {language === 'fr' ? 'Voir les détails' : 'View Details'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal copié de Skills */}
      {selectedExperience && (
        <div className="modal-overlay" onClick={closeExperienceModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <h3>{selectedExperience.title}</h3>
                <div className="modal-meta">
                  <span className="modal-period">
                    <Calendar size={16} />
                    {selectedExperience.period}
                  </span>
                  <span className="modal-location">
                    <MapPin size={16} />
                    {selectedExperience.location}
                  </span>
                </div>
              </div>
              <button className="close-btn" onClick={closeExperienceModal}>
                <X size={24} />
              </button>
            </div>
            
                         <div className="modal-body-content">
              {selectedExperience.client && (
                <div className="modal-client">
                  <strong>Client :</strong> {selectedExperience.client}
                </div>
              )}
              
              <div className="modal-description">
                <h4>{language === 'fr' ? 'Description' : 'Description'}</h4>
                <p>{selectedExperience.description}</p>
              </div>
              
              <div className="modal-technologies">
                <h4>{language === 'fr' ? 'Technologies utilisées' : 'Technologies used'}</h4>
                <div className="tech-tags">
                  {selectedExperience.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-achievements">
                <h4>{language === 'fr' ? 'Réalisations complètes' : 'Complete achievements'}</h4>
                <ul>
                  {selectedExperience.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-challenges">
                <h4>{language === 'fr' ? 'Défis rencontrés' : 'Challenges faced'}</h4>
                <p>{selectedExperience.challenges}</p>
              </div>

              <div className="modal-impact">
                <h4>{language === 'fr' ? 'Impact et résultats' : 'Impact and results'}</h4>
                <p>{selectedExperience.impact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
