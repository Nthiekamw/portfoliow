import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import usePageAnimation from '../animations/usePageAnimation';
import './Contact.css';
import '../animations/animations.css';

const Contact = () => {
  const { t } = useLanguage();
  const animationRef = usePageAnimation('contact');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialiser EmailJS
  useEffect(() => {
    emailjs.init("WT_iGPC0q0WQjeElT"); // Votre vraie Public Key
  }, []);

  // Suggestions de sujets d'email avec messages pré-remplis
  const emailSuggestions = [
    {
      subject: 'Recherche de stage en développement web',
      message: `Bonjour William Nthiekam,

Je suis actuellement en formation en développement web et je recherche activement un stage pour mettre en pratique mes compétences. J'ai développé un portfolio qui présente mes projets et mes compétences techniques.

Mon profil :
- Formation : [Votre formation actuelle]
- Compétences : [Vos compétences principales]
- Disponibilité : [Période souhaitée pour le stage]
- Motivation : [Pourquoi ce stage vous intéresse]

Pourriez-vous me donner plus d'informations sur les opportunités de stage disponibles dans votre équipe ?

Merci de votre temps.

Cordialement,
[Votre nom]`
    },
    {
      subject: 'Candidature pour un stage en développement',
      message: `Bonjour William Nthiekam,

Je vous présente ma candidature pour un stage en développement web. Passionné par la programmation, j'ai créé plusieurs projets personnels et je souhaite maintenant acquérir une expérience professionnelle.

Mon profil :
- Formation : [Votre formation actuelle]
- Projets réalisés : [Bref aperçu de vos projets]
- Compétences techniques : [Vos technologies maîtrisées]
- Objectifs : [Ce que vous attendez de ce stage]

Mon portfolio démontre mes compétences et ma motivation. Seriez-vous disponible pour échanger sur les opportunités de stage ?

Merci de considérer ma candidature.

Cordialement,
[Votre nom]`
    },
    {
      subject: 'Demande de stage - Portfolio développeur web',
      message: `Bonjour William Nthiekam,

Je recherche un stage en développement web pour la période [précisez la période]. Mon portfolio présente mes projets et mes compétences techniques acquises en formation.

Mon profil :
- Formation : [Votre formation actuelle]
- Période souhaitée : [Dates précises du stage]
- Compétences : [Vos technologies maîtrisées]
- Motivation : [Pourquoi ce stage vous intéresse]

J'aimerais échanger avec vous sur les opportunités de stage au sein de votre équipe et comment je pourrais contribuer à vos projets.

Merci de votre temps.

Cordialement,
[Votre nom]`
    },
    {
      subject: 'Échange sur les opportunités de stage',
      message: `Bonjour William Nthiekam,

Je suis en formation en développement web et je souhaite échanger avec vous sur les opportunités de stage dans votre entreprise. J'ai consulté vos projets et votre approche m'intéresse beaucoup.

Mon profil :
- Formation : [Votre formation actuelle]
- Compétences : [Vos technologies maîtrisées]
- Objectifs : [Ce que vous attendez d'un stage]
- Questions : [Vos questions sur l'entreprise/les projets]

Pourriez-vous me donner quelques minutes pour discuter de vos besoins et de mes compétences ?

Merci de votre temps.

Cordialement,
[Votre nom]`
    },
    {
      subject: 'Demande de conseil pour ma recherche de stage',
      message: `Bonjour William Nthiekam,

Je recherche actuellement un stage en développement web et j'aimerais avoir vos conseils sur ma démarche. Votre expérience dans le domaine m'intéresse beaucoup.

Ma situation :
- Formation : [Votre formation actuelle]
- Compétences : [Vos technologies maîtrisées]
- Démarches : [Ce que vous avez déjà fait]
- Questions : [Vos questions spécifiques]

Pourriez-vous me donner quelques conseils pour améliorer ma candidature ou m'orienter vers des entreprises qui recrutent des stagiaires ?

Merci de votre aide.

Cordialement,
[Votre nom]`
    },
    {
      subject: 'Autre demande concernant un stage',
      message: `Bonjour William Nthiekam,

Je vous contacte pour une demande spécifique concernant un stage en développement web :

Ma demande : [Décrivez votre demande spécifique]
Contexte : [Votre situation actuelle]
Objectifs : [Ce que vous souhaitez accomplir]
Questions : [Vos questions particulières]

Merci de me recontacter pour discuter de cette demande.

Cordialement,
[Votre nom]`
    },
    {
      subject: 'Autre',
      message: `Bonjour William Nthiekam,

[Votre message personnalisé]

Cordialement,
[Votre nom]`
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setFormData({
      ...formData,
      subject: selectedSubject
    });

    // Pré-remplir le message selon le sujet choisi
    if (selectedSubject) {
      const suggestion = emailSuggestions.find(s => s.subject === selectedSubject);
      if (suggestion) {
        setFormData(prev => ({
          ...prev,
          subject: selectedSubject,
          message: suggestion.message
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Paramètres du template EmailJS
      const templateParams = {
        to_email: '	williamnthiekam392@gmail.com',
        from_name: formData.fullName,
        from_email: formData.email,
        from_phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      };

      // Envoyer l'email via EmailJS
      const result = await emailjs.send(
        'service_av4lx2i', // Votre Service ID
        'template_z3ca2dx', // Votre Template ID EmailJS
        templateParams
      );

      console.log('Email envoyé avec succès:', result);
      setSubmitStatus('success');
      
      // Réinitialiser le formulaire après succès
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Masquer le message de succès après 5 secondes
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
      
      // Masquer le message d'erreur après 5 secondes
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section className="contact" id="contact" ref={animationRef}>
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="heading">
          {t('contactMeTitle')} <span>{t('isFrench') ? 'Contact' : 'Contact'}</span>
        </h2>

        <div className="contact-content">
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h4>Email</h4>
                <p>	williamnthiekam392@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Phone size={24} />
              <div>
                <h4>Téléphone</h4>
                <p>06 15 01 36 94</p>
              </div>
            </div>
            
            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <h4>Localisation</h4>
                <p>Paris, France</p>
              </div>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form" 
            variants={itemVariants}
            onSubmit={handleSubmit}
          >
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                placeholder={t('fullName')}
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t('emailAddress')}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="input-group">
              <input
                type="tel"
                name="phone"
                placeholder={t('mobileNumber')}
                value={formData.phone}
                onChange={handleInputChange}
              />
              <select
                name="subject"
                value={formData.subject}
                onChange={handleSubjectChange}
                required
                className="subject-select"
              >
                <option value="">{t('isFrench') ? 'Choisir un sujet' : 'Choose a subject'}</option>
                {emailSuggestions.map((suggestion, index) => (
                  <option key={index} value={suggestion.subject}>
                    {suggestion.subject}
                  </option>
                ))}
              </select>
            </div>
            
            <textarea
              name="message"
              rows="8"
              placeholder={t('yourMessage')}
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            
            <button 
              type="submit" 
              className="btn"
              disabled={isSubmitting}
            >
              <Send size={20} />
              <span>
                {isSubmitting 
                  ? (t('isFrench') ? 'Envoi en cours...' : 'Sending...') 
                  : t('sendMessage')
                }
              </span>
            </button>

            {/* Messages de statut */}
            {submitStatus === 'success' && (
              <motion.div 
                className="status-message success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CheckCircle size={20} />
                <span>{t('isFrench') ? 'Message envoyé avec succès!' : 'Message sent successfully!'}</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                className="status-message error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <span>{t('isFrench') ? 'Erreur lors de l\'envoi. Veuillez réessayer.' : 'Error sending message. Please try again.'}</span>
              </motion.div>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact; // N W - Nthiekam William
