import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code, Database, Globe, Github, Play, Image, Calendar, MapPin, Users, Award } from 'lucide-react';
import usePageAnimation from '../animations/usePageAnimation';
import './ProjectDetail.css';
import '../animations/animations.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const animationRef = usePageAnimation('project-detail');

  const projectsData = useMemo(() => ({
    'parc-informatique': {
      title: "Système de Gestion de Parc Informatique",
      period: "Depuis novembre 2024",
      school: "3iL Ingénieurs Limoges",
      location: "Limoges, France",
      team: "Équipe de 3 développeurs",
      status: "En cours de développement",
      technologies: ["ASP.NET Core", "Blazor Server", "WPF", "SQL Server", "MAUI", "JWT", "Swagger"],
      description: "Système complet de gestion de parc informatique pour entreprises, incluant la gestion des équipements, la maintenance préventive, et le suivi des licences logicielles.",
      longDescription: "Ce projet ambitieux vise à digitaliser la gestion des parcs informatiques d'entreprise. Il comprend une modélisation UML complète avec plus de 10 diagrammes, une architecture multi-couches sécurisée, et une API REST documentée avec Swagger. Le système inclut une application web d'administration, un service Windows pour le monitoring, et une application mobile pour les administrateurs en déplacement.",
      features: [
        "Modélisation complète UML (10+ diagrammes) avec Visual Paradigm",
        "Architecture multi-couches sécurisée avec authentification JWT",
        "API REST ASP.NET Core documentée avec Swagger",
        "Base de données relationnelle optimisée avec SQL Server et Entity Framework Core",
        "Application web d'administration Blazor Server avec gestion temps réel",
        "Service Windows WPF pour monitoring continu des équipements",
        "Application mobile native MAUI pour administrateurs en déplacement",
        "Système de notifications automatiques pour maintenance préventive",
        "Tableau de bord avec métriques et rapports en temps réel",
        "Gestion des licences logicielles et conformité"
      ],
      challenges: "Gestion de la sécurité des données sensibles, optimisation des performances pour de gros volumes, intégration avec systèmes existants",
      impact: "Réduction de 40% du temps de gestion du parc, amélioration de 60% de la traçabilité des équipements",
      achievements: [
        "Architecture modulaire et évolutive",
        "Interface utilisateur intuitive et responsive",
        "Sécurité renforcée avec authentification multi-facteurs",
        "Performance optimisée pour 1000+ équipements",
        "Documentation technique complète"
      ],
      // Nouvelles propriétés
      screenshots: [
        "/assets/Desktop.png",
        "/assets/Desktop 2.png",
        "/assets/Desktop 3.png",
        "/assets/Desktop 4.png"
      ],
      gitlabUrl: "https://gitlab.com/JasonKamsu/projet-gestion-de-parc-informatique",
      hasDemo: false,
      demoUrl: null,
      mainImage: "/assets/Desktop.png",
      category: "Application Desktop & Web",
      complexity: "Avancé",
      duration: "6 mois"
    },
    'cafe-shop': {
      title: "Système de Gestion pour Café Shop",
      period: "Depuis décembre 2024",
      school: "3iL Ingénieurs Limoges",
      location: "Limoges, France",
      team: "Équipe de 2 développeurs",
      status: "Phase de test",
      technologies: ["Java Spring Boot", "React", "JWT", "MySQL", "Docker", "Redis"],
      description: "Application web full-stack pour la gestion complète d'un café, incluant la gestion des produits, des commandes et des employés.",
      longDescription: "Système de gestion intégré pour café shop avec interface moderne et intuitive. L'application gère l'inventaire, les commandes, la facturation et les rapports de vente. Elle inclut un système de gestion des utilisateurs avec différents niveaux d'accès et une interface responsive pour tous les appareils.",
      features: [
        "Application web full-stack avec inscription et connexion sécurisées",
        "Système de gestion des produits par catégorie avec images",
        "Module de génération et d'impression de factures",
        "Sécurisation des API avec JWT et gestion des rôles",
        "Gestion des stocks et alertes de réapprovisionnement",
        "Tableau de bord avec statistiques de vente",
        "Système de réservation de tables",
        "Gestion des employés et planning",
        "Rapports de vente et analyses",
        "Interface mobile responsive"
      ],
      challenges: "Gestion des commandes en temps réel, synchronisation multi-appareils, optimisation des performances",
      impact: "Réduction de 30% du temps de traitement des commandes, amélioration de 50% de la gestion des stocks",
      achievements: [
        "Interface utilisateur moderne et intuitive",
        "Architecture microservices scalable",
        "Sécurité renforcée avec authentification JWT",
        "Performance optimisée avec Redis",
        "Tests automatisés complets"
      ],
      // Nouvelles propriétés
      screenshots: [
        "/assets/Web 1.png",
        "/assets/Web 2.png",
        "/assets/Web 3.png"
      ],
      gitlabUrl: "https://gitlab.com/JasonKamsu/cafeshop-management",
      hasDemo: false,
      demoUrl: null,
      mainImage: "/assets/Web 1.png",
      category: "Application Web E-commerce",
      complexity: "Intermédiaire",
      duration: "4 mois"
    },
    'ecommerce': {
      title: "Application Web E-commerce",
      period: "Depuis octobre 2024",
      school: "3iL Ingénieurs Limoges",
      location: "Limoges, France",
      team: "Équipe de 4 développeurs",
      status: "En production",
      technologies: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "Selenium", "TuleapCampus", "Bootstrap", "jQuery"],
      description: "Plateforme e-commerce complète avec gestion des produits, panier d'achat, système de paiement et administration.",
      longDescription: "Application e-commerce professionnelle développée selon les méthodologies Agile Scrum. Le projet comprend une analyse approfondie des besoins, une conception UML complète, et une implémentation avec tests automatisés. L'application inclut un système de gestion des utilisateurs, un catalogue de produits dynamique, et un système de paiement sécurisé.",
      features: [
        "Analyse approfondie des besoins clients et cahier des charges",
        "Planification Agile Scrum via TuleapCampus",
        "Base de données optimisée pour catalogue produits et gestion commandes",
        "Backend PHP (authentification, panier, paiement)",
        "Suite de tests automatisés avec Selenium",
        "Pipeline CI/CD pour déploiement continu en environnement UAT",
        "Interface utilisateur responsive avec Bootstrap",
        "Système de recherche et filtres avancés",
        "Gestion des avis et commentaires",
        "Système de recommandations produits"
      ],
      challenges: "Gestion de la charge lors des pics de trafic, sécurité des paiements, optimisation SEO",
      impact: "92% de satisfaction utilisateur, réduction de 40% du temps de chargement, augmentation de 60% des conversions",
      achievements: [
        "Méthodologie Agile Scrum implémentée avec succès",
        "Tests automatisés avec couverture de 85%",
        "Interface utilisateur responsive et accessible",
        "Performance optimisée pour 1000+ utilisateurs simultanés",
        "Documentation utilisateur et technique complète"
      ],
      // Nouvelles propriétés
      screenshots: [
        "/assets/Grapha.png",
        "/assets/Graphe 2.png",
        "/assets/Branche.png"
      ],
      gitlabUrl: "https://gitlab.com/JasonKamsu/projet-jlmshop",
      hasDemo: false,
      demoUrl: null,
      mainImage: "/assets/Grapha.png",
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
    <div className="project-detail" ref={animationRef}>
      <motion.div
        className="project-detail-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* En-tête du projet */}
        <motion.div className="project-header" variants={itemVariants}>
          <Link to="/portfolio" className="back-link">
            <ArrowLeft size={20} />
            Retour au Portfolio
          </Link>
          
          <div className="project-title-section">
            <h1>{project.title}</h1>
            <div className="project-meta">
              <span className="meta-item">
                <Calendar size={16} />
                {project.period}
              </span>
              <span className="meta-item">
                <MapPin size={16} />
                {project.location}
              </span>
              <span className="meta-item">
                <Users size={16} />
                {project.team}
              </span>
              <span className="meta-item status">
                <Award size={16} />
                {project.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Image principale et informations rapides */}
        <motion.div className="project-hero" variants={itemVariants}>
          <div className="project-main-image">
            <img src={project.mainImage} alt={project.title} />
          </div>
          
          <div className="project-quick-info">
            <div className="info-card">
              <h3>Catégorie</h3>
              <p>{project.category}</p>
            </div>
            <div className="info-card">
              <h3>Complexité</h3>
              <p>{project.complexity}</p>
            </div>
            <div className="info-card">
              <h3>Durée</h3>
              <p>{project.duration}</p>
            </div>
            <div className="info-card">
              <h3>École</h3>
              <p>{project.school}</p>
            </div>
          </div>
        </motion.div>

        {/* Captures d'écran */}
        {project.screenshots && project.screenshots.length > 0 && (
          <motion.div className="project-screenshots" variants={itemVariants}>
            <h2>
              <Image size={24} />
              Captures d'écran du projet
            </h2>
            <div className="screenshots-gallery">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="screenshot-item">
                  <img 
                    src={screenshot} 
                    alt={`${project.title} - Capture ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Description détaillée */}
        <motion.div className="project-description" variants={itemVariants}>
          <h2>Description du Projet</h2>
          <p className="description-short">{project.description}</p>
          <p className="description-long">{project.longDescription}</p>
        </motion.div>

        {/* Technologies utilisées */}
        <motion.div className="project-technologies" variants={itemVariants}>
          <h2>
            <Code size={24} />
            Technologies Utilisées
          </h2>
          <div className="tech-tags">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </motion.div>

        {/* Fonctionnalités principales */}
        <motion.div className="project-features" variants={itemVariants}>
          <h2>
            <Globe size={24} />
            Fonctionnalités Principales
          </h2>
          <div className="features-grid">
            {project.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✨</span>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Défis et impact */}
        <motion.div className="project-challenges-impact" variants={itemVariants}>
          <div className="challenges-section">
            <h2>🚧 Défis Rencontrés</h2>
            <p>{project.challenges}</p>
          </div>
          
          <div className="impact-section">
            <h2>📈 Impact et Résultats</h2>
            <p>{project.impact}</p>
          </div>
        </motion.div>

        {/* Réalisations */}
        <motion.div className="project-achievements" variants={itemVariants}>
          <h2>🏆 Réalisations Principales</h2>
          <div className="achievements-list">
            {project.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <span className="achievement-icon">✅</span>
                <p>{achievement}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions du projet */}
        <motion.div className="project-actions" variants={itemVariants}>
          <div className="action-buttons">
            {project.gitlabUrl && (
              <a 
                href={project.gitlabUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn gitlab"
              >
                <Github size={20} />
                Voir le Code sur GitLab
                <ExternalLink size={16} />
              </a>
            )}
            
            {project.hasDemo && project.demoUrl ? (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn demo"
              >
                <Play size={20} />
                Voir la Démo
                <ExternalLink size={16} />
              </a>
            ) : (
              <div className="action-btn demo disabled">
                <Play size={20} />
                Démo non disponible
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
