#!/bin/bash

# Script de déploiement local pour tester le build
# Usage: ./scripts/deploy.sh

echo "🚀 Démarrage du déploiement local..."

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

echo "✅ Node.js et npm sont installés"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

echo "✅ Dépendances installées"

# Build de l'application
echo "🔨 Build de l'application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

echo "✅ Build réussi"

# Vérifier que le dossier build existe
if [ ! -d "build" ]; then
    echo "❌ Le dossier build n'existe pas"
    exit 1
fi

echo "✅ Dossier build créé"

# Lister le contenu du dossier build
echo "📁 Contenu du dossier build :"
ls -la build/

echo ""
echo "🎉 Déploiement local réussi !"
echo "📂 Votre application est prête dans le dossier 'build/'"
echo ""
echo "🌐 Pour tester localement :"
echo "   npx serve -s build"
echo ""
echo "📤 Pour déployer sur Netlify :"
echo "   1. Poussez sur GitLab (git push origin main)"
echo "   2. Le pipeline CI/CD se déclenchera automatiquement"
echo "   3. Déployez manuellement depuis GitLab CI/CD"
