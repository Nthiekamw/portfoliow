import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Code, Database, Server, Shield, GitBranch, TestTube, Users, GraduationCap, Globe, X } from 'lucide-react';
import usePageAnimation from '../animations/usePageAnimation';
import './Skills.css';
import '../animations/animations.css';

const Skills = () => {
  const { t, isFrench } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const animationRef = usePageAnimation('skills');

  const technicalSkills = [
    {
      id: 'backend',
      icon: <Code size={32} />,
      title: "Back-End",
      skills: ["Java Spring Boot", "C# (.NET Core)", "PHP (Symfony 6)", "Node.js", "Python"],
      description: isFrench ? 
        "Développement d'APIs robustes et scalables avec Java Spring Boot, création d'applications .NET Core performantes, développement web avec PHP Symfony 6. Expertise en architecture microservices et gestion des bases de données." :
        "Development of robust and scalable APIs with Java Spring Boot, creation of high-performance .NET Core applications, web development with PHP Symfony 6. Expertise in microservices architecture and database management."
    },
    {
      id: 'frontend',
      icon: <Server size={32} />,
      title: "Front-End",
      skills: ["JavaScript", "React", "Angular", "HTML/CSS", "Dart (Flutter)"],
      description: isFrench ?
        "Création d'interfaces utilisateur modernes et responsive avec React et Angular. Développement d'applications mobiles cross-platform avec Flutter. Maîtrise des technologies web modernes et des frameworks CSS." :
        "Creation of modern and responsive user interfaces with React and Angular. Cross-platform mobile app development with Flutter. Mastery of modern web technologies and CSS frameworks."
    },
    {
      id: 'database',
      icon: <Database size={32} />,
      title: "Base de données",
      skills: ["MySQL", "SQL Server", "Firebase", "SQLite", "Entity Framework"],
      description: isFrench ?
        "Conception et optimisation de bases de données relationnelles avec MySQL et SQL Server. Utilisation de Firebase pour les applications temps réel. Maîtrise d'Entity Framework pour l'ORM .NET." :
        "Design and optimization of relational databases with MySQL and SQL Server. Use of Firebase for real-time applications. Mastery of Entity Framework for .NET ORM."
    },
    {
      id: 'tools',
      icon: <GitBranch size={32} />,
      title: "Outils & Méthodes",
      skills: ["Git/GitHub/GitLab", "Scrum", "TuleapCampus", "Trello", "ClickUp"],
      description: isFrench ?
        "Gestion de versions avec Git et plateformes collaboratives. Application des méthodes Agile Scrum pour la gestion de projets. Utilisation d'outils de planification et de suivi de projets." :
        "Version control with Git and collaborative platforms. Application of Agile Scrum methods for project management. Use of project planning and tracking tools."
    },
    {
      id: 'testing',
      icon: <TestTube size={32} />,
      title: "Tests & Qualité",
      skills: ["Selenium", "JUnit", "Postman", "Swagger", "TDD"],
      description: isFrench ?
        "Tests automatisés avec Selenium pour les interfaces web. Tests unitaires avec JUnit. Documentation et tests d'APIs avec Postman et Swagger. Application du développement dirigé par les tests (TDD)." :
        "Automated testing with Selenium for web interfaces. Unit testing with JUnit. API documentation and testing with Postman and Swagger. Application of Test-Driven Development (TDD)."
    },
    {
      id: 'security',
      icon: <Shield size={32} />,
      title: "Sécurité & API",
      skills: ["JWT", "OAuth 2.0", "REST API", "GraphQL", "RGPD"],
      description: isFrench ?
        "Implémentation de systèmes d'authentification sécurisés avec JWT et OAuth 2.0. Développement d'APIs REST et GraphQL. Conformité RGPD et protection des données sensibles." :
        "Implementation of secure authentication systems with JWT and OAuth 2.0. Development of REST and GraphQL APIs. GDPR compliance and sensitive data protection."
    }
  ];

  const softSkills = [
    {
      icon: <Users size={32} />,
      title: "Esprit d'équipe",
      description: "Collaboration dans des équipes multiculturelles et interdisciplinaires"
    },
    {
      icon: <Code size={32} />,
      title: "Autonomie",
      description: "Gestion complète de projets personnels de A à Z (JunaPay)"
    },
    {
      icon: <GraduationCap size={32} />,
      title: "Esprit de synthèse",
      description: "Rédaction de documentation technique claire et concise"
    },
    {
      icon: <Database size={32} />,
      title: "Organisation",
      description: "Gestion simultanée de multiples projets avec respect des deadlines"
    },
    {
      icon: <Server size={32} />,
      title: "Aisance rédactionnelle",
      description: "Documentation en français et anglais, rapports techniques"
    },
    {
      icon: <Shield size={32} />,
      title: "Proactivité",
      description: "Veille technologique constante, proposition d'améliorations"
    },
    {
      icon: <TestTube size={32} />,
      title: "Rigueur & Fiabilité",
      description: "Code testé et documenté, respect des normes de qualité"
    },
    {
      icon: <GitBranch size={32} />,
      title: "Créativité",
      description: "Conception d'interfaces innovantes et solutions techniques originales"
    }
  ];

  const education = [
    {
      degree: "Manager de Solutions Digitales et Data",
      school: "3iL Ingénieurs Limoges",
      period: "Depuis septembre 2024",
      description: "Spécialisation : Architecture logicielle, Big Data, Intelligence Artificielle"
    },
    {
      degree: "Conception de Système d'Information Informatisé",
      school: "Institut Universitaire de la Cote Douala",
      period: "Octobre 2023 - Mai 2024",
      description: "Développement Logiciel et Web"
    },
    {
      degree: "DEC (Diplôme d'Etude Collégial)",
      school: "Institut Universitaire de la Cote Douala",
      period: "2021 - 2023",
      description: "Formation en informatique et développement"
    }
  ];

  const languages = [
    { name: "Français", level: "Langue Maternelle", flag: "🇫🇷" },
    { name: "Anglais", level: "Niveau B2", flag: "🇬🇧" }
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
    <section className="skills" id="skills" ref={animationRef}>
      <motion.div
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="heading">
          {t('skillsTitle')} <span>{t('skills')}</span>
        </h2>

        {/* Compétences Techniques */}
        <motion.div className="skills-section" variants={itemVariants}>
          <h3 className="section-title">
            <Code size={24} />
            {isFrench ? 'Compétences Techniques' : 'Technical Skills'}
          </h3>
          
          <div className="skills-grid">
            {technicalSkills.map((category, index) => (
              <div key={index} className="skill-category">
                <div className="skill-header">
                  <div className="skill-icon">
                    {category.icon}
                  </div>
                  <h4>{category.title}</h4>
                </div>
                
                <div className="skill-tags">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="btn skill-btn"
                  onClick={() => setSelectedSkill(category)}
                >
                  {t('readMore')}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div className="skills-section" variants={itemVariants}>
          <h3 className="section-title">
            <Users size={24} />
            {isFrench ? 'Compétences Transversales' : 'Soft Skills'}
          </h3>
          
          <div className="soft-skills-grid">
            {softSkills.map((skill, index) => (
              <div key={index} className="soft-skill-card">
                <div className="soft-skill-icon">
                  {skill.icon}
                </div>
                <h4>{skill.title}</h4>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Formation */}
        <motion.div className="skills-section" variants={itemVariants}>
          <h3 className="section-title">
            <GraduationCap size={24} />
            {isFrench ? 'Formation & Diplômes' : 'Education & Degrees'}
          </h3>
          
          <div className="education-grid">
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <h4>{edu.degree}</h4>
                <p className="school">{edu.school}</p>
                <p className="period">{edu.period}</p>
                <p className="description">{edu.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Langues */}
        <motion.div className="skills-section" variants={itemVariants}>
          <h3 className="section-title">
            <Globe size={24} />
            {isFrench ? 'Langues' : 'Languages'}
          </h3>
          
          <div className="languages-grid">
            {languages.map((lang, index) => (
              <div key={index} className="language-card">
                <div className="language-flag">{lang.flag}</div>
                <h4>{lang.name}</h4>
                <p>{lang.level}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Modal pour les détails des compétences */}
      {selectedSkill && (
        <div className="modal-overlay" onClick={() => setSelectedSkill(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedSkill(null)}
            >
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <div className="modal-icon">
                {selectedSkill.icon}
              </div>
              <h3>{selectedSkill.title}</h3>
            </div>
            
            <div className="modal-body">
              <div className="modal-skills">
                <h4>{isFrench ? 'Technologies utilisées :' : 'Technologies used:'}</h4>
                <div className="modal-skill-tags">
                  {selectedSkill.skills.map((skill, index) => (
                    <span key={index} className="modal-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="modal-description">
                <h4>{isFrench ? 'Description détaillée :' : 'Detailed description:'}</h4>
                <p>{selectedSkill.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;
