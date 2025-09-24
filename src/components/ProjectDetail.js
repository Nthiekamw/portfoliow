import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code, Globe, Github, Play, Image, Calendar, MapPin, Users, Award } from 'lucide-react';
import usePageAnimation from '../animations/usePageAnimation';
import './ProjectDetail.css';
import '../animations/animations.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const animationRef = usePageAnimation('project-detail');

  const projectsData = useMemo(() => ({
    'trip-payment': {
      title: "Trip - Application de Paiement",
      period: "Depuis janvier 2025",
      school: "Projet Personnel",
      location: "Remote",
      team: "Équipe de 2 développeurs",
      status: "En développement",
      technologies: ["Flutter", "Node.js", "Firebase"],
      description: "Application mobile de paiement sécurisée, permettant la gestion des transactions et des comptes utilisateurs.",
      longDescription: "Trip est une application mobile complète pour effectuer des paiements en toute sécurité, gérer son portefeuille et suivre ses transactions. Développée avec Flutter pour le front-end et Node.js avec Firebase pour le backend, elle permet une expérience fluide sur Android et iOS.",
      features: [
        "Inscription et authentification sécurisées",
        "Gestion des comptes et portefeuilles",
        "Transactions instantanées entre utilisateurs",
        "Historique détaillé des paiements",
        "Notifications push pour les transactions",
        "Interface utilisateur moderne et intuitive",
        "Intégration Firebase pour la sécurité et la base de données"
      ],
      challenges: "Sécurisation des transactions, synchronisation temps réel, compatibilité multi-plateformes",
      impact: "Prototype fonctionnel permettant de gérer des paiements simulés et tests utilisateurs positifs",
      achievements: [
        "Application Flutter multiplateforme",
        "Backend Node.js avec Firebase sécurisé",
        "Interface UX/UI responsive et moderne"
      ],
      screenshots: [
        "/assets/Trip1.png",
        "/assets/Trip2.png",
        "/assets/Trip3.png"
      ],
      gitlabUrl: "https://gitlab.com/NthiekamWilliam/trip-payment",
      hasDemo: true,
      demoUrl: "https://demo.tripapp.com",
      mainImage: "/assets/Trip1.png",
      category: "Application Mobile",
      complexity: "Avancé",
      duration: "5 mois"
    },
    'school-registration': {
      title: "Système d'Inscription dans un Établissement Scolaire",
      period: "Depuis février 2025",
      school: "Projet Personnel",
      location: "Remote",
      team: "Équipe de 3 développeurs",
      status: "Phase de test",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      description: "Application web pour gérer les inscriptions et les dossiers des étudiants dans un établissement scolaire.",
      longDescription: "Ce système permet aux établissements scolaires de gérer l'inscription des étudiants, le suivi des dossiers, les notifications et la gestion administrative. L'application web offre une interface intuitive pour les administrateurs et les enseignants.",
      features: [
        "Gestion complète des inscriptions",
        "Suivi des dossiers étudiants",
        "Notifications automatiques",
        "Gestion des niveaux et classes",
        "Interface admin et enseignant",
        "Export et reporting des données"
      ],
      challenges: "Gestion des données sensibles, optimisation de l'accès concurrent, interface multi-utilisateurs",
      impact: "Réduction des délais administratifs de 50%, meilleure organisation des dossiers",
      achievements: [
        "Interface web responsive",
        "Backend sécurisé avec Node.js et MongoDB",
        "Gestion multi-utilisateurs fonctionnelle"
      ],
      screenshots: [
        "/assets/School1.png",
        "/assets/School2.png",
        "/assets/School3.png"
      ],
      gitlabUrl: "https://gitlab.com/NthiekamWilliam/school-registration",
      hasDemo: false,
      demoUrl: null,
      mainImage: "/assets/School1.png",
      category: "Application Web",
      complexity: "Intermédiaire",
      duration: "4 mois"
    },
    'thegift': {
      title: "TheGift",
      period: "Depuis mars 2025",
      school: "Projet Personnel",
      location: "Remote",
      team: "Équipe de 2 développeurs",
      status: "En production",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      description: "Plateforme web pour gérer et offrir des cadeaux personnalisés et suivre les commandes.",
      longDescription: "TheGift permet aux utilisateurs d'envoyer et de gérer des cadeaux personnalisés. L'application inclut un catalogue, un système de paiement intégré, des notifications et un suivi des commandes en temps réel.",
      features: [
        "Catalogue de cadeaux interactif",
        "Gestion des commandes et paiements",
        "Notifications et rappels automatiques",
        "Interface utilisateur intuitive",
        "Suivi en temps réel des commandes",
        "Système d'évaluation des cadeaux"
      ],
      challenges: "Sécurisation des paiements, gestion du catalogue dynamique, performance sur pics de trafic",
      impact: "Augmentation de la satisfaction utilisateur et simplification de l’envoi de cadeaux",
      achievements: [
        "Plateforme fonctionnelle et sécurisée",
        "Backend performant avec Node.js",
        "UI/UX responsive et agréable"
      ],
      screenshots: [
        "/assets/TheGift1.png",
        "/assets/TheGift2.png",
        "/assets/TheGift3.png"
      ],
      gitlabUrl: "https://gitlab.com/NthiekamWilliam/thegift",
      hasDemo: true,
      demoUrl: "https://demo.thegift.com",
      mainImage: "/assets/TheGift1.png",
      category: "Application Web E-commerce",
      complexity: "Avancé",
      duration: "5 mois"
    }
  }), []);

  useEffect(() => {
    if (projectsData[id]) {
      setProject(projectsData[id]);
    }
  }, [id, projectsData]);

  if (!project) {
    return (
      <div className="project-detail-container">
        <div className="project-not-found">
          <h2>Projet non trouvé</h2>
          <Link to="/portfolio" className="btn">
            <ArrowLeft size={20} />
            Retour au Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="project-detail" ref={animationRef}>
      <motion.div className="project-detail-container" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="project-header" variants={itemVariants}>
          <Link to="/portfolio" className="back-link">
            <ArrowLeft size={20} /> Retour au Portfolio
          </Link>
          <div className="project-title-section">
            <h1>{project.title}</h1>
            <div className="project-meta">
              <span className="meta-item"><Calendar size={16} />{project.period}</span>
              <span className="meta-item"><MapPin size={16} />{project.location}</span>
              <span className="meta-item"><Users size={16} />{project.team}</span>
              <span className="meta-item status"><Award size={16} />{project.status}</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="project-hero" variants={itemVariants}>
          <div className="project-main-image"><img src={project.mainImage} alt={project.title} /></div>
          <div className="project-quick-info">
            <div className="info-card"><h3>Catégorie</h3><p>{project.category}</p></div>
            <div className="info-card"><h3>Complexité</h3><p>{project.complexity}</p></div>
            <div className="info-card"><h3>Durée</h3><p>{project.duration}</p></div>
            <div className="info-card"><h3>École</h3><p>{project.school}</p></div>
          </div>
        </motion.div>

        {project.screenshots && project.screenshots.length > 0 && (
          <motion.div className="project-screenshots" variants={itemVariants}>
            <h2><Image size={24} /> Captures d'écran du projet</h2>
            <div className="screenshots-gallery">
              {project.screenshots.map((s, i) => (<div key={i} className="screenshot-item"><img src={s} alt={`${project.title} - Capture ${i + 1}`} loading="lazy" /></div>))}
            </div>
          </motion.div>
        )}

        <motion.div className="project-description" variants={itemVariants}>
          <h2>Description du Projet</h2>
          <p className="description-short">{project.description}</p>
          <p className="description-long">{project.longDescription}</p>
        </motion.div>

        <motion.div className="project-technologies" variants={itemVariants}>
          <h2><Code size={24} /> Technologies Utilisées</h2>
          <div className="tech-tags">{project.technologies.map((tech,i)=><span key={i} className="tech-tag">{tech}</span>)}</div>
        </motion.div>

        <motion.div className="project-features" variants={itemVariants}>
          <h2><Globe size={24} /> Fonctionnalités Principales</h2>
          <div className="features-grid">{project.features.map((f,i)=><div key={i} className="feature-item"><span className="feature-icon">✨</span><p>{f}</p></div>)}</div>
        </motion.div>

        <motion.div className="project-challenges-impact" variants={itemVariants}>
          <div className="challenges-section"><h2>🚧 Défis Rencontrés</h2><p>{project.challenges}</p></div>
          <div className="impact-section"><h2>📈 Impact et Résultats</h2><p>{project.impact}</p></div>
        </motion.div>

        <motion.div className="project-achievements" variants={itemVariants}>
          <h2>🏆 Réalisations Principales</h2>
          <div className="achievements-list">{project.achievements.map((a,i)=><div key={i} className="achievement-item"><span className="achievement-icon">✅</span><p>{a}</p></div>)}</div>
        </motion.div>

        <motion.div className="project-actions" variants={itemVariants}>
          <div className="action-buttons">
            {project.gitlabUrl && (
              <a href={project.gitlabUrl} target="_blank" rel="noopener noreferrer" className="action-btn gitlab">
                <Github size={20} /> Voir le Code sur GitLab <ExternalLink size={16} />
              </a>
            )}
            {project.hasDemo && project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="action-btn demo">
                <Play size={20} /> Voir la Démo <ExternalLink size={16} />
              </a>
            ) : (
              <div className="action-btn demo disabled"><Play size={20} /> Démo non disponible</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
