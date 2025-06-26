#!/bin/bash

# FinergyCloud Mobile App Deployment Script
# This script helps deploy the mobile app to various platforms

echo "🚀 FinergyCloud Mobile App Deployment"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the mobile-app directory"
    exit 1
fi

echo "📱 Choose deployment option:"
echo "1. GitHub Pages (Free)"
echo "2. Netlify (Recommended)"
echo "3. Vercel (Fast)"
echo "4. Firebase (Google)"
echo "5. Local testing server"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "📚 GitHub Pages Deployment"
        echo "1. Ensure your code is pushed to GitHub"
        echo "2. Go to repository Settings → Pages"
        echo "3. Select 'Deploy from a branch' → main"
        echo "4. Your app will be at: https://username.github.io/repo-name/mobile-app/"
        ;;
    2)
        echo "🌐 Netlify Deployment"
        echo "1. Go to https://netlify.com"
        echo "2. Connect your GitHub repository"
        echo "3. Set publish directory to: mobile-app"
        echo "4. Deploy!"
        echo "5. Optional: Add custom domain in Netlify settings"
        ;;
    3)
        echo "⚡ Vercel Deployment"
        if command -v vercel &> /dev/null; then
            echo "Deploying to Vercel..."
            vercel --prod
        else
            echo "Installing Vercel CLI..."
            npm install -g vercel
            echo "Run 'vercel' to deploy"
        fi
        ;;
    4)
        echo "🔥 Firebase Deployment"
        if command -v firebase &> /dev/null; then
            echo "Initializing Firebase..."
            firebase init hosting
            echo "Run 'firebase deploy' to deploy"
        else
            echo "Installing Firebase CLI..."
            npm install -g firebase-tools
            echo "Run 'firebase login' then 'firebase init hosting'"
        fi
        ;;
    5)
        echo "🖥️  Starting local server..."
        if command -v python3 &> /dev/null; then
            echo "Server running at: http://localhost:8000"
            echo "Access on mobile: http://YOUR_IP:8000"
            python3 -m http.server 8000
        elif command -v python &> /dev/null; then
            echo "Server running at: http://localhost:8000"
            python -m SimpleHTTPServer 8000
        elif command -v node &> /dev/null; then
            if command -v npx &> /dev/null; then
                echo "Server running at: http://localhost:8000"
                npx http-server -p 8000
            else
                echo "Please install http-server: npm install -g http-server"
            fi
        else
            echo "❌ No suitable server found. Please install Python or Node.js"
        fi
        ;;
    *)
        echo "❌ Invalid choice"
        ;;
esac

echo ""
echo "📱 After deployment, test on mobile:"
echo "1. Open the URL on your phone's browser"
echo "2. Tap browser menu → 'Add to Home Screen'"
echo "3. The app will install like a native app!"
echo ""
echo "🏪 For app store distribution:"
echo "1. Use PWA Builder: https://pwabuilder.com"
echo "2. Enter your deployed app URL"
echo "3. Generate packages for Google Play & App Store"