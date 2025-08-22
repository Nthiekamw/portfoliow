import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ExternalLink, Code, Database, Globe } from 'lucide-react';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const { } = useLanguage();
  const [project, setProject] = useState(null);

  const projectsData = {
    'parc-informatique': {
      title: "Système de Gestion de Parc Informatique",
      period: "Depuis novembre 2024",
      school: "3iL Ingénieurs Limoges",
      technologies: ["ASP.NET Core", "Blazor Server", "WPF", "SQL Server", "MAUI", "JWT", "Swagger"],
      description: "Modélisation complète UML (10+ diagrammes) avec Visual Paradigm Architecture multi-couches sécurisée API REST ASP.NET Core sécurisée par JWT et documentée avec Swagger Base de données relationnelle optimisée avec SQL Server et Entity Framework Core Application web d'administration Blazor Server avec gestion temps réel Service Windows WPF pour monitoring continu des équipements Application mobile native MAUI pour administrateurs en déplacement",
      image: "/assets/coffee-shop-barista-concept-illustration.png",
      features: [
        "Modélisation complète UML (10+ diagrammes) avec Visual Paradigm",
        "Architecture multi-couches sécurisée",
        "API REST ASP.NET Core sécurisée par JWT et documentée avec Swagger",
        "Base de données relationnelle optimisée avec SQL Server et Entity Framework Core",
        "Application web d'administration Blazor Server avec gestion temps réel",
        "Service Windows WPF pour monitoring continu des équipements",
        "Application mobile native MAUI pour administrateurs en déplacement"
      ]
    },
    'cafe-shop': {
      title: "Système de Gestion pour Café Shop",
      period: "Depuis décembre 2024",
      school: "3iL Ingénieurs Limoges",
      technologies: ["Java Spring Boot", "React", "JWT", "MySQL", "Docker"],
      description: "Application web full-stack avec inscription et connexion sécurisées Système de gestion des produits par catégorie Module de génération et d'impression de factures Sécurisation des API avec JWT",
      image: "/assets/cafeShop.png",
      features: [
        "Application web full-stack avec inscription et connexion sécurisées",
        "Système de gestion des produits par catégorie",
        "Module de génération et d'impression de factures",
        "Sécurisation des API avec JWT"
      ]
    },
    'ecommerce': {
      title: "Application Web E-commerce",
      period: "Depuis octobre 2024",
      school: "3iL Ingénieurs Limoges",
      technologies: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "Selenium", "TuleapCampus"],
      description: "Analyse approfondie des besoins clients et cahier des charges Planification Agile Scrum via TuleapCampus Base de données optimisée pour catalogue produits et gestion commandes Backend PHP (authentification, panier, paiement) Suite de tests automatisés avec Selenium Pipeline CI/CD pour déploiement continu en environnement UAT",
      image: "/assets/téléchargement.png",
      features: [
        "Analyse approfondie des besoins clients et cahier des charges",
        "Planification Agile Scrum via TuleapCampus",
        "Base de données optimisée pour catalogue produits et gestion commandes",
        "Backend PHP (authentification, panier, paiement)",
        "Suite de tests automatisés avec Selenium",
        "Pipeline CI/CD pour déploiement continu en environnement UAT"
      ]
    }
  };

  useEffect(() => {
    if (projectsData[id]) {
      setProject(projectsData[id]);
    }
  }, [id]);

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
    <div className="project-detail">
      <motion.div
        className="project-detail-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="project-header" variants={itemVariants}>
          <Link to="/portfolio" className="back-link">
            <ArrowLeft size={20} />
            Retour au Portfolio
          </Link>
          
          <h1>{project.title}</h1>
          <div className="project-meta">
            <span className="period">{project.period}</span>
            <span className="school">{project.school}</span>
          </div>
        </motion.div>

        <motion.div className="project-content" variants={itemVariants}>
          <div className="project-image">
            <img src={project.image} alt={project.title} />
          </div>

          <div className="project-info">
            <div className="project-section">
              <h3>
                <Code size={24} />
                Technologies Utilisées
              </h3>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-section">
              <h3>
                <Database size={24} />
                Description du Projet
              </h3>
              <p>{project.description}</p>
            </div>

            <div className="project-section">
              <h3>
                <Globe size={24} />
                Fonctionnalités Principales
              </h3>
              <ul className="features-list">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="project-actions">
              <button className="btn">
                <ExternalLink size={20} />
                Voir le Projet
              </button>
              <button className="btn secondary">
                <Code size={20} />
                Code Source
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
