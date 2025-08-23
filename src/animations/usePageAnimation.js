import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AnimationManager from './AnimationManager';

const usePageAnimation = (pageName) => {
  const containerRef = useRef(null);
  const animationManagerRef = useRef(null);
  const cleanupRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Créer une instance du gestionnaire d'animations si elle n'existe pas
    if (!animationManagerRef.current) {
      animationManagerRef.current = new AnimationManager();
    }

    // Démarrer l'animation pour la page actuelle
    if (containerRef.current) {
      cleanupRef.current = animationManagerRef.current.startAnimation(pageName, containerRef);
    }

    // Nettoyer l'animation lors du démontage ou changement de page
    return () => {
      if (cleanupRef.current && typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
      if (animationManagerRef.current) {
        animationManagerRef.current.stopAnimation();
      }
    };
  }, [pageName, location.pathname]);

  // Nettoyer lors du démontage du composant
  useEffect(() => {
    return () => {
      if (cleanupRef.current && typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
      if (animationManagerRef.current) {
        animationManagerRef.current.stopAnimation();
      }
    };
  }, []);

  return containerRef;
};

export default usePageAnimation;
