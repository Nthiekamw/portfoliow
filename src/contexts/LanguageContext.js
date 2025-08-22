import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'fr' ? 'en' : 'fr');
  };

  const t = (key) => {
    const translations = {
      fr: {
        // Navigation
        home: 'Accueil',
        about: 'À propos',
        experience: 'Expériences',
        skills: 'Compétences',
        services: 'Services',
        portfolio: 'Portfolio',
        references: 'Références',
        contact: 'Contact',
        
        // Home Section
        hello: 'Bonjour, je m\'appelle',
        andIAm: 'Et je suis',
        downloadCV: 'Télécharger CV',
        contactMe: 'Me Contacter',
        
        // About Section
        aboutMe: 'À propos de Moi',
        passionateDeveloper: 'Développeur Full-Stack Passionné',
        aboutDescription: 'Étudiant en Master Manager de Solutions Digitales et Data à 3iL Ingénieurs Limoges, je suis passionné par le développement logiciel et l\'innovation technologique.',
        yearsExperience: 'Années d\'expérience',
        projectsCompleted: 'Projets réalisés',
        technologiesMastered: 'Technologies maîtrisées',
        
        // Skills
        mySkills: 'Mes Compétences',
        skillsTitle: 'Mes',
        skills: 'Compétences',
        backendTechnologies: 'Technologies Back-End',
        frontendTechnologies: 'Technologies Front-End',
        architecture: 'Architecture',
        toolsAndMethods: 'Outils et Méthodes',
        database: 'Base de Données',
        testingTools: 'Outils de Test',
        apiAndWebServices: 'API et Services Web',
        versioning: 'Versionnement du Code',
        security: 'Sécurité & Systèmes Critiques',
        softSkills: 'Compétences Transversales',
        languages: 'Langues',
        education: 'Diplômes et Formations',
        
        // Experience
        professionalExperience: 'Expériences Professionnelles',
        
        // Services
        services: 'Mes Services',
        
        // Portfolio
        academicProjects: 'Projets Académiques',
        
        // Contact
        contactMeTitle: 'Contactez-moi !',
        fullName: 'Nom complet',
        emailAddress: 'Adresse email',
        mobileNumber: 'Numéro de téléphone',
        emailSubject: 'Sujet de l\'email',
        yourMessage: 'Votre message',
        sendMessage: 'Envoyer le message',
        
        // References
        referencesAndInterests: 'Références & Centres d\'intérêt',
        referencesSection: 'Références',
        interests: 'Centres d\'intérêt',
        
        // Common
        readMore: 'En savoir plus',
        close: 'Fermer'
      },
      en: {
        // Navigation
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        skills: 'Skills',
        services: 'Services',
        portfolio: 'Portfolio',
        references: 'References',
        contact: 'Contact',
        
        // Home Section
        hello: 'Hello, I am',
        andIAm: 'And I am',
        downloadCV: 'Download CV',
        contactMe: 'Contact Me',
        
        // About Section
        aboutMe: 'About Me',
        passionateDeveloper: 'Passionate Full-Stack Developer',
        aboutDescription: 'Master\'s student in Digital and Data Solutions Management at 3iL Ingénieurs Limoges, I am passionate about software development and technological innovation.',
        yearsExperience: 'Years of experience',
        projectsCompleted: 'Projects completed',
        technologiesMastered: 'Technologies mastered',
        
        // Skills
        mySkills: 'My Skills',
        skillsTitle: 'My',
        skills: 'Skills',
        backendTechnologies: 'Back-End Technologies',
        frontendTechnologies: 'Front-End Technologies',
        architecture: 'Architecture',
        toolsAndMethods: 'Tools and Methods',
        database: 'Database',
        testingTools: 'Testing Tools',
        apiAndWebServices: 'API and Web Services',
        versioning: 'Code Versioning',
        security: 'Security & Critical Systems',
        softSkills: 'Soft Skills',
        languages: 'Languages',
        education: 'Education & Training',
        
        // Experience
        professionalExperience: 'Professional Experience',
        
        // Services
        services: 'My Services',
        
        // Portfolio
        academicProjects: 'Academic Projects',
        
        // Contact
        contactMeTitle: 'Contact Me!',
        fullName: 'Full Name',
        emailAddress: 'Email Address',
        mobileNumber: 'Mobile Number',
        emailSubject: 'Email Subject',
        yourMessage: 'Your Message',
        sendMessage: 'Send Message',
        
        // References
        referencesAndInterests: 'References & Interests',
        referencesSection: 'References',
        interests: 'Interests',
        
        // Common
        readMore: 'Read More',
        close: 'Close'
      }
    };

    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
    isFrench: language === 'fr'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
