// Configuration Google Analytics
// Remplacez 'GA_MEASUREMENT_ID' par votre ID de mesure Google Analytics

export const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'; // À remplacer par votre ID

// Initialisation de Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'GA_MEASUREMENT_ID') {
    // Charger Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialiser gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Fonction pour tracker les événements
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Fonction pour tracker les pages
export const trackPage = (page_path, page_title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: page_path,
      page_title: page_title,
    });
  }
};
