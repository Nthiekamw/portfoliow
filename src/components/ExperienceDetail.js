import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin, ExternalLink, Github, Play, Image, ArrowLeft } from 'lucide-react';
import usePageAnimation from '../animations/usePageAnimation';
import './ExperienceDetail.css';
import '../animations/animations.css';

const ExperienceDetail = () => {
  const { language } = useLanguage();
  const { id } = useParams();
  const animationRef = usePageAnimation('experience-detail');

  const experiences = [
    {
      id: "trip-application",
      title: "Trip - Application de Paiement Mobile",
      period: "Depuis juin 2025",
      location: "Douala, Cameroun",
      description: "Solution de paiement mobile sécurisée avec Flutter, Node.js et Firebase",
      technologies: ["Node.js", "Flutter", "Firebase", "React", "MySQL"],
      achievements: [
        "Backend API REST avec Node.js et Express",
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
      challenges: language === 'fr' 
        ? "Sécurité des transactions, scalabilité pour plusieurs milliers d'utilisateurs"
        : "Transaction security, scalability for thousands of users",
      impact: language === 'fr'
        ? "Réduction de 50% des erreurs de transaction, augmentation de 150% des paiements mobiles"
        : "50% reduction in transaction errors, 150% increase in mobile payments",
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
      id: "estlc-inscription",
      title: "Système d'Inscription Universitaire",
      period: "Mai 2024 - Août 2024",
      location: "ESTLC Ecole Supérieure de Transport, Logistique et Commerce",
      client: "ESTLC Ecole Supérieure de Transport, Logistique et Commerce (Cameroun)",
      description: "Digitalisation du processus d'inscription pour 5000+ candidats annuels",
      technologies: ["Node.js", "MySQL", "JavaMail API", "JWT"],
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
        : "70% improvement in enrollment process efficiency",
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
      period: "Mars 2023 - Août 2023",
      location: "Douala, Cameroun",
      client: "ChickDev Douala",
      description: "Application e-commerce pour cadeaux avec gestion mobile et web",
      technologies: ["Node.js", "Angular", "Flutter", "MySQL", "Docker"],
      achievements: [
        "Analyse fonctionnelle et technique avec diagrammes UML",
        "Base de données SQL optimisée avec 15+ tables relationnelles",
        "Backend microservices avec Node.js",
        "APIs RESTful documentées avec Swagger",
        "Interface mobile Flutter responsive (92% de satisfaction utilisateur)",
        "Version web Angular avec gestion d'état Redux",
        "Système de versioning GitLab avec revues de code et intégration continue"
      ],
      challenges: language === 'fr'
        ? "Conception de l'architecture microservices, optimisation des performances"
        : "Designing microservices architecture, performance optimization",
      impact: language === 'fr'
        ? "92% de satisfaction utilisateur, réduction de 40% du temps de chargement"
        : "92% user satisfaction, 40% reduction in loading time",
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

  const experience = experiences.find(exp => exp.id === id);

  if (!experience) {
    return (
      <div className="experience-detail-not-found">
        <h2>{language === 'fr' ? 'Expérience non trouvée' : 'Experience not found'}</h2>
        <Link to="/experience" className="back-btn">
          <ArrowLeft size={20} />
          {language === 'fr' ? 'Retour aux expériences' : 'Back to experiences'}
        </Link>
      </div>
    );
  }

  return (
    <div className="experience-detail" ref={animationRef}>
      <div className="experience-detail-container">
        {/* Header avec navigation */}
        <div className="experience-detail-header">
          <Link to="/experience" className="back-btn">
            <ArrowLeft size={24} />
            {language === 'fr' ? 'Retour aux expériences' : 'Back to experiences'}
          </Link>
        </div>

        {/* Titre et métadonnées */}
        <div className="experience-detail-title-section">
          <h1 className="experience-detail-title">{experience.title}</h1>
          <div className="experience-detail-meta">
            <div className="meta-item">
              <Calendar size={20} />
              <span>{experience.period}</span>
            </div>
            <div className="meta-item">
              <MapPin size={20} />
              <span>{experience.location}</span>
            </div>
            {experience.client && (
              <div className="meta-item client">
                <span className="client-icon">🏢</span>
                <span>{experience.client}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description principale */}
        <div className="experience-detail-description">
          <h2>{language === 'fr' ? 'Description du projet' : 'Project description'}</h2>
          <p>{experience.description}</p>
        </div>

        {/* Captures d'écran */}
        {experience.screenshots && experience.screenshots.length > 0 && (
          <div className="experience-detail-screenshots">
            <h2>
              <Image size={24} />
              {language === 'fr' ? 'Captures d\'écran' : 'Screenshots'}
            </h2>
            <div className="screenshots-gallery">
              {experience.screenshots.map((screenshot, index) => (
                <div key={index} className="screenshot-item">
                  <img 
                    src={screenshot} 
                    alt={`${experience.title} - Capture ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies utilisées */}
        <div className="experience-detail-technologies">
          <h2>{language === 'fr' ? 'Technologies utilisées' : 'Technologies used'}</h2>
          <div className="tech-tags">
            {experience.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        {/* Réalisations */}
        <div className="experience-detail-achievements">
          <h2>{language === 'fr' ? 'Réalisations principales' : 'Key achievements'}</h2>
          <ul className="achievements-list">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="achievement-item">
                <span className="achievement-icon">✅</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        {/* Défis et impact */}
        <div className="experience-detail-challenges-impact">
          <div className="challenges-section">
            <h2>{language === 'fr' ? 'Défis rencontrés' : 'Challenges faced'}</h2>
            <p>{experience.challenges}</p>
          </div>
          <div className="impact-section">
            <h2>{language === 'fr' ? 'Impact et résultats' : 'Impact and results'}</h2>
            <p>{experience.impact}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="experience-detail-actions">
          {experience.gitlabUrl && (
            <a 
              href={experience.gitlabUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-btn gitlab"
            >
              <Github size={20} />
              {language === 'fr' ? 'Voir le code sur GitLab' : 'View code on GitLab'}
              <ExternalLink size={16} />
            </a>
          )}
          
          {experience.hasDemo && experience.demoUrl ? (
            <a 
              href={experience.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-btn demo"
            >
              <Play size={20} />
              {language === 'fr' ? 'Voir la démo' : 'View demo'}
              <ExternalLink size={16} />
            </a>
          ) : (
            <div className="action-btn demo disabled">
              <Play size={20} />
              {language === 'fr' ? 'Démo non disponible' : 'Demo not available'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;
