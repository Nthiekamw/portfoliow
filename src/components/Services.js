import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Smartphone, Code, Database, Globe, Shield, Zap, Palette, Cloud } from 'lucide-react';
import usePageAnimation from '../animations/usePageAnimation';
import './Services.css';
import '../animations/animations.css';

const Services = () => {
  const { t, language } = useLanguage();
  const animationRef = usePageAnimation('services');

  const services = [
    {
      icon: <Smartphone size={40} />,
      title: language === 'fr' ? "Développement Mobile" : "Mobile Development",
      shortDescription: language === 'fr' 
        ? "Spécialisé en dark et flutter, je développes mes compétences en développement web et  mobile."
        : "Proficient in dark abd flutter, I am dedicated to expanding my mobile and web development skills.",
      fullDescription: language === 'fr'
        ? "Expert en développement backend avec Csharp , je me spécialise dans la création d'APIs robustes et sécurisées. Mon expérience inclut la conception d'architectures microservices, l'optimisation des performances et la mise en place de systèmes de sécurité avancés. Je travaille actuellement sur l'expansion de mes compétences en développement mobile pour offrir des solutions complètes cross-platform."
        : "Expert in backend development with Csharp , I specialize in creating robust and secure APIs. My experience includes designing microservice architectures, performance optimization, and implementing advanced security systems. I am currently working on expanding my mobile development skills to offer complete cross-platform solutions.",
      color: "#ff6b6b",
      technologies: language === 'fr' 
        ? ["Csharp ", "Csharp  ", "REST APIs", "Microservices", "Sécurité"]
        : ["Csharp ", "Csharp  ", "REST APIs", "Microservices", "Security"]
    },
    {
      icon: <Code size={40} />,
      title: language === 'fr' ? "Intégration d'APIs" : "API Integration",
      shortDescription: language === 'fr'
        ? "Expérimenté dans la conception et l'intégration d'APIs, notamment lors de mes  stage et alternance ."
        : "Experienced in designing and integrating APIs, especially during my internship and Work-study.",
      fullDescription: language === 'fr'
        ? "Spécialiste de l'intégration d'APIs avec une expérience approfondie dans la conception de systèmes distribués. J'ai développé des APIs RESTful performantes avec documentation Swagger, implémenté des systèmes d'authentification JWT, et créé des pipelines CI/CD. Mon stage chez Geny Shop m'a permis de maîtriser l'intégration de services tiers et l'optimisation des performances API."
        : "API integration specialist with deep experience in designing distributed systems. I have developed high-performance RESTful APIs with Swagger documentation, implemented JWT authentication systems, and created CI/CD pipelines. My internship at Geny Shop allowed me to master third-party service integration and API performance optimization.",
      color: "#4ecdc4",
      technologies: language === 'fr'
        ? ["REST APIs", "Swagger", "JWT", "CI/CD", "Performance"]
        : ["REST APIs", "Swagger", "JWT", "CI/CD", "Performance"]
    },
    {
      icon: <Database size={40} />,
      title: language === 'fr' ? "Développement Full Stack" : "Full Stack Development",
      shortDescription: language === 'fr'
        ? "Avec une solide base en développement backend et frontend."
        : "With a strong foundation in both backend and frontend development.",
      fullDescription: language === 'fr'
        ? "Développeur Full Stack polyvalent maîtrisant l'ensemble de la stack technique moderne. Côté backend : Csharp, bases de données relationnelles et NoSQL, microservices. Côté frontend : React, Angular, interfaces responsives et PWA. J'utilise des méthodologies Agile et des outils DevOps pour assurer la qualité et la livraison continue."
        : "Versatile Full Stack developer mastering the entire modern technical stack. Backend: Csharp, relational and NoSQL databases, microservices. Frontend: React, Angular, responsive interfaces and PWA. I use Agile methodologies and DevOps tools to ensure quality and continuous delivery.",
      color: "#45b7d1",
      technologies: language === 'fr'
        ? ["Spring Boot", "React", "Vue ", "MySQL", "DevOps"]
        : ["Spring Boot", "React", "Vue", "MySQL", "DevOps"]
    },
    {
      icon: <Globe size={40} />,
      title: language === 'fr' ? "Développement Web" : "Web Development",
      shortDescription: language === 'fr'
        ? "Création de sites web modernes et responsifs avec les dernières technologies."
        : "Creating modern and responsive websites with the latest technologies.",
      fullDescription: language === 'fr'
        ? "Spécialiste du développement web moderne avec expertise en React, Vue et technologies frontend avancées. Je crée des interfaces utilisateur intuitives, des applications web progressives (PWA) et des sites e-commerce performants. Mon approche inclut l'optimisation SEO, l'accessibilité et la performance pour offrir une expérience utilisateur exceptionnelle."
        : "Modern web development specialist with expertise in React, Angular and advanced frontend technologies. I create intuitive user interfaces, progressive web applications (PWA) and high-performance e-commerce sites. My approach includes SEO optimization, accessibility and performance to deliver an exceptional user experience.",
      color: "#f39c12",
      technologies: language === 'fr'
        ? ["React", "Vue", "HTML5", "CSS3", "JavaScript"]
        : ["React", "Vue", "HTML5", "CSS3", "JavaScript"]
    },
    {
      icon: <Shield size={40} />,
      title: language === 'fr' ? "Sécurité & DevOps" : "Security & DevOps",
      shortDescription: language === 'fr'
        ? "Mise en place de pipelines CI/CD et sécurisation des applications."
        : "Setting up CI/CD pipelines and securing applications.",
      fullDescription: language === 'fr'
        ? "Expert en sécurité informatique et DevOps avec une approche proactive de la protection des données. J'implémente des pipelines CI/CD robustes avec GitLab et Jenkins, des tests de sécurité automatisés, et des stratégies de déploiement sécurisées. Mon expertise inclut la gestion des secrets, le chiffrement des données et la conformité aux standards de sécurité."
        : "Cybersecurity and DevOps expert with a proactive approach to data protection. I implement robust CI/CD pipelines with GitLab and Jenkins, automated security testing, and secure deployment strategies. My expertise includes secret management, data encryption and compliance with security standards.",
      color: "#e74c3c",
      technologies: language === 'fr'
        ? ["Github, azur",  "Docker", "Sécurité", "CI/CD"]
        : ["Github, azur",  "Docker", "Security", "CI/CD"]
    },
    {
      icon: <Zap size={40} />,
      title: language === 'fr' ? "Optimisation Performance" : "Performance Optimization",
      shortDescription: language === 'fr'
        ? "Amélioration des performances et de la scalabilité des applications."
        : "Improving application performance and scalability.",
      fullDescription: language === 'fr'
        ? "Spécialiste de l'optimisation des performances avec une approche data-driven. J'analyse et optimise les bases de données, les requêtes API et les interfaces utilisateur pour maximiser la vitesse et l'efficacité. Mes techniques incluent la mise en cache, la compression des données, l'optimisation des images et la réduction du temps de chargement."
        : "Performance optimization specialist with a data-driven approach. I analyze and optimize databases, API queries and user interfaces to maximize speed and efficiency. My techniques include caching, data compression, image optimization and loading time reduction.",
      color: "#9b59b6",
      technologies: language === 'fr'
        ? ["MySQL", "Cache", "Compression", "Optimisation", "Monitoring"]
        : ["MySQL", "Cache", "Compression", "Optimization", "Monitoring"]
    },
    {
      icon: <Palette size={40} />,
      title: language === 'fr' ? "UI/UX Design" : "UI/UX Design",
      shortDescription: language === 'fr'
        ? "Conception d'interfaces utilisateur intuitives et esthétiques."
        : "Designing intuitive and aesthetic user interfaces.",
      fullDescription: language === 'fr'
        ? "Designer UI/UX passionné par la création d'expériences utilisateur exceptionnelles. Je combine créativité et méthodologie pour concevoir des interfaces intuitives, accessibles et visuellement attrayantes. Mon processus inclut la recherche utilisateur, le prototypage, les tests d'utilisabilité et l'itération continue pour optimiser l'expérience."
        : "UI/UX designer passionate about creating exceptional user experiences. I combine creativity and methodology to design intuitive, accessible and visually appealing interfaces. My process includes user research, prototyping, usability testing and continuous iteration to optimize the experience.",
      color: "#1abc9c",
      technologies: language === 'fr'
        ? ["Figma", "Adobe XD", "Prototypage", "Tests UX", "Accessibilité"]
        : ["Figma", "Adobe XD", "Prototyping", "UX Testing", "Accessibility"]
    },
    {
      icon: <Cloud size={40} />,
      title: language === 'fr' ? "Architecture Cloud" : "Cloud Architecture",
      shortDescription: language === 'fr'
        ? "Conception d'architectures cloud scalables et résilientes."
        : "Designing scalable and resilient cloud architectures.",
      fullDescription: language === 'fr'
        ? "Architecte cloud spécialisé dans la conception de solutions évolutives et résilientes. Je conçois des architectures microservices, des systèmes distribués et des infrastructures cloud-native. Mon expertise inclut la gestion des conteneurs, l'orchestration Kubernetes, la surveillance des performances et la gestion des coûts cloud."
        : "Cloud architect specialized in designing scalable and resilient solutions. I design microservices architectures, distributed systems and cloud-native infrastructures. My expertise includes container management, Kubernetes orchestration, performance monitoring and cloud cost management.",
      color: "#3498db",
      technologies: language === 'fr'
        ? ["AWS", "Docker", "Kubernetes", "Microservices", "Monitoring"]
        : ["AWS", "Docker", "Kubernetes", "Microservices", "Monitoring"]
    }
  ];

  return (
    <section className="services" id="services" ref={animationRef}>
      <div className="services-container">
        <h2 className="heading">
          {t('services')}
        </h2>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-box"
            >
              <div className="service-icon" style={{ color: service.color }}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
