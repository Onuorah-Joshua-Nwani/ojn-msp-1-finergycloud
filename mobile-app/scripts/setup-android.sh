#!/bin/bash

# FinergyCloud Android Setup Script
# This script sets up the Android development environment

set -e

echo "🔧 FinergyCloud Android Setup"
echo "============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Detect operating system
OS="unknown"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    OS="windows"
fi

print_status "Detected OS: $OS"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    print_status "Please install Node.js from https://nodejs.org/"
    exit 1
fi

print_success "Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

print_success "npm version: $(npm --version)"

# Check if Java is installed
if ! command -v java &> /dev/null; then
    print_warning "Java is not installed"
    print_status "Installing Java..."
    
    if [[ "$OS" == "macos" ]]; then
        if command -v brew &> /dev/null; then
            brew install openjdk@11
            echo 'export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc
        else
            print_error "Homebrew not found. Please install Java manually"
        fi
    elif [[ "$OS" == "linux" ]]; then
        sudo apt-get update
        sudo apt-get install -y openjdk-11-jdk
    else
        print_error "Please install Java 11 manually"
    fi
else
    print_success "Java is installed"
    java -version
fi

# Check if Android SDK is installed
if [ -z "$ANDROID_HOME" ]; then
    print_warning "ANDROID_HOME is not set"
    print_status "Please install Android Studio and set ANDROID_HOME"
    print_status "Or install Android SDK command line tools"
    
    # Suggest Android SDK installation
    if [[ "$OS" == "macos" ]]; then
        print_status "For macOS:"
        print_status "1. Download Android Studio from https://developer.android.com/studio"
        print_status "2. Add to ~/.zshrc: export ANDROID_HOME=\$HOME/Library/Android/sdk"
        print_status "3. Add to ~/.zshrc: export PATH=\$PATH:\$ANDROID_HOME/emulator:\$ANDROID_HOME/tools:\$ANDROID_HOME/tools/bin:\$ANDROID_HOME/platform-tools"
    elif [[ "$OS" == "linux" ]]; then
        print_status "For Linux:"
        print_status "1. Download Android Studio from https://developer.android.com/studio"
        print_status "2. Add to ~/.bashrc: export ANDROID_HOME=\$HOME/Android/Sdk"
        print_status "3. Add to ~/.bashrc: export PATH=\$PATH:\$ANDROID_HOME/emulator:\$ANDROID_HOME/tools:\$ANDROID_HOME/tools/bin:\$ANDROID_HOME/platform-tools"
    fi
else
    print_success "ANDROID_HOME is set: $ANDROID_HOME"
fi

# Install React Native CLI if not present
if ! command -v react-native &> /dev/null; then
    print_status "Installing React Native CLI..."
    npm install -g @react-native-community/cli
else
    print_success "React Native CLI is installed"
fi

# Install project dependencies
print_status "Installing project dependencies..."
npm install

# Create necessary directories
print_status "Creating Android project structure..."
mkdir -p android/app/src/main/java/com/finergycloud/app
mkdir -p android/app/src/main/res/layout
mkdir -p android/app/src/main/res/values
mkdir -p android/app/src/main/res/drawable
mkdir -p android/app/src/main/res/mipmap-hdpi
mkdir -p android/app/src/main/res/mipmap-mdpi
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi
mkdir -p android/app/src/main/res/mipmap-anydpi-v26

# Generate app icons (placeholder)
print_status "Setting up app icons..."
# Note: In a real setup, you would generate proper icons here
# For now, we'll create placeholder files

# Create gradle wrapper if it doesn't exist
if [ ! -f "android/gradlew" ]; then
    print_status "Setting up Gradle wrapper..."
    cd android
    gradle wrapper --gradle-version 8.0.1
    cd ..
fi

# Make gradlew executable
chmod +x android/gradlew

# Check Android SDK components
if [ -n "$ANDROID_HOME" ]; then
    print_status "Checking Android SDK components..."
    
    # Check if SDK manager is available
    if [ -f "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" ]; then
        SDKMANAGER="$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager"
    elif [ -f "$ANDROID_HOME/tools/bin/sdkmanager" ]; then
        SDKMANAGER="$ANDROID_HOME/tools/bin/sdkmanager"
    else
        print_warning "SDK Manager not found. Please install Android SDK command line tools"
    fi
    
    if [ -n "$SDKMANAGER" ]; then
        print_status "Installing required SDK components..."
        yes | $SDKMANAGER "platform-tools" "platforms;android-34" "build-tools;34.0.0"
    fi
fi

# Create development keystore
KEYSTORE_PATH="android/app/debug.keystore"
if [ ! -f "$KEYSTORE_PATH" ]; then
    print_status "Creating debug keystore..."
    keytool -genkey -v -keystore "$KEYSTORE_PATH" -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 -storepass android -keypass android -dname "CN=Android Debug,O=Android,C=US"
fi

# Create setup completion file
cat > "android-setup-complete.txt" << EOF
FinergyCloud Android Setup Complete
==================================

Setup Date: $(date)
OS: $OS
Node.js: $(node --version)
npm: $(npm --version)

Next Steps:
1. Connect an Android device or start an emulator
2. Run: npm run android
3. For release builds, set up a release keystore
4. Follow the Play Store release checklist

Development Commands:
- Start Metro bundler: npm start
- Run on Android: npm run android
- Build debug APK: npm run build:android
- Build release AAB: npm run build:android-bundle

Troubleshooting:
- If build fails, try: npm run clean
- For permission issues: chmod +x android/gradlew
- For SDK issues, check ANDROID_HOME environment variable

Documentation:
- React Native: https://reactnative.dev/docs/environment-setup
- Android Development: https://developer.android.com/docs
- Play Store Publishing: https://developer.android.com/distribute/console
EOF

print_success "🎉 Android setup completed!"
print_status "📖 Setup details saved to: android-setup-complete.txt"
echo ""
print_status "🚀 To start development:"
print_status "   1. Connect Android device or start emulator"
print_status "   2. Run: npm run android"
echo ""
print_status "📱 To build for Play Store:"
print_status "   1. Run: ./scripts/build-android.sh"
print_status "   2. Follow: play-store/release-checklist.md"