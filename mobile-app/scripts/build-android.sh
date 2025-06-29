#!/bin/bash

# FinergyCloud Android Build Script
# This script builds the Android app for Play Store release

set -e

echo "🚀 FinergyCloud Android Build Script"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the mobile-app directory"
    exit 1
fi

# Check if Android SDK is available
if [ -z "$ANDROID_HOME" ]; then
    print_error "ANDROID_HOME environment variable is not set"
    print_error "Please install Android SDK and set ANDROID_HOME"
    exit 1
fi

# Check if Java is available
if ! command -v java &> /dev/null; then
    print_error "Java is not installed or not in PATH"
    exit 1
fi

print_status "Checking Java version..."
java -version

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed or not in PATH"
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status "Installing Node.js dependencies..."
    npm install
else
    print_status "Node.js dependencies already installed"
fi

# Clean previous builds
print_status "Cleaning previous builds..."
if [ -d "android/app/build" ]; then
    rm -rf android/app/build
fi

# Create Android directory structure if it doesn't exist
if [ ! -d "android" ]; then
    print_status "Creating Android project structure..."
    mkdir -p android/app/src/main/{java/com/finergycloud/app,res/{layout,values,mipmap-hdpi,mipmap-mdpi,mipmap-xhdpi,mipmap-xxhdpi,mipmap-xxxhdpi}}
fi

# Generate keystore for signing (development only)
KEYSTORE_PATH="android/app/debug.keystore"
if [ ! -f "$KEYSTORE_PATH" ]; then
    print_status "Generating debug keystore..."
    keytool -genkey -v -keystore "$KEYSTORE_PATH" -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 -storepass android -keypass android -dname "CN=Android Debug,O=Android,C=US"
fi

# Build the Android app
print_status "Building Android app..."
cd android

# Make gradlew executable
chmod +x gradlew

# Clean and build
print_status "Running Gradle clean..."
./gradlew clean

print_status "Building debug APK..."
./gradlew assembleDebug

print_status "Building release APK..."
./gradlew assembleRelease

print_status "Building release App Bundle (AAB)..."
./gradlew bundleRelease

cd ..

# Check if builds were successful
DEBUG_APK="android/app/build/outputs/apk/debug/app-debug.apk"
RELEASE_APK="android/app/build/outputs/apk/release/app-release.apk"
RELEASE_AAB="android/app/build/outputs/bundle/release/app-release.aab"

if [ -f "$DEBUG_APK" ]; then
    print_success "Debug APK built successfully: $DEBUG_APK"
    APK_SIZE=$(du -h "$DEBUG_APK" | cut -f1)
    print_status "Debug APK size: $APK_SIZE"
else
    print_error "Debug APK build failed"
fi

if [ -f "$RELEASE_APK" ]; then
    print_success "Release APK built successfully: $RELEASE_APK"
    APK_SIZE=$(du -h "$RELEASE_APK" | cut -f1)
    print_status "Release APK size: $APK_SIZE"
else
    print_warning "Release APK build failed (this is normal if you don't have a release keystore)"
fi

if [ -f "$RELEASE_AAB" ]; then
    print_success "Release App Bundle built successfully: $RELEASE_AAB"
    AAB_SIZE=$(du -h "$RELEASE_AAB" | cut -f1)
    print_status "Release AAB size: $AAB_SIZE"
else
    print_warning "Release App Bundle build failed (this is normal if you don't have a release keystore)"
fi

# Generate build info
BUILD_INFO="build-info.txt"
print_status "Generating build information..."
cat > "$BUILD_INFO" << EOF
FinergyCloud Android Build Information
=====================================

Build Date: $(date)
Build Environment: $(uname -a)
Node.js Version: $(node --version)
npm Version: $(npm --version)
Java Version: $(java -version 2>&1 | head -n 1)
Android SDK: $ANDROID_HOME

Build Outputs:
- Debug APK: $DEBUG_APK
- Release APK: $RELEASE_APK
- Release AAB: $RELEASE_AAB

Next Steps:
1. Test the debug APK on physical devices
2. Set up release keystore for production builds
3. Upload release AAB to Google Play Console
4. Configure app listing and store assets
5. Submit for review

For Play Store release:
1. Create release keystore: keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
2. Add keystore info to gradle.properties
3. Build release: ./gradlew bundleRelease
4. Upload AAB to Play Console
EOF

print_success "Build information saved to: $BUILD_INFO"

echo ""
print_success "🎉 Android build completed successfully!"
echo ""
print_status "📱 To install debug APK on device:"
print_status "   adb install $DEBUG_APK"
echo ""
print_status "🏪 For Play Store release:"
print_status "   1. Set up release keystore"
print_status "   2. Build release AAB"
print_status "   3. Upload to Google Play Console"
echo ""
print_status "📖 See play-store/release-checklist.md for complete release guide"