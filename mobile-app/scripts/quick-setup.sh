#!/bin/bash

# Quick Setup Script for FinergyCloud Android Development
# This script provides a streamlined setup process

set -e

echo "⚡ FinergyCloud Quick Setup"
echo "=========================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Step 1: Check prerequisites
print_step "Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    print_success "Node.js found: $(node --version)"
else
    print_error "Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi

# Check Java
if command -v java &> /dev/null; then
    print_success "Java found: $(java -version 2>&1 | head -n 1)"
else
    print_warning "Java not found. Installing..."
    
    # Try to install Java
    if [[ "$OSTYPE" == "darwin"* ]] && command -v brew &> /dev/null; then
        brew install openjdk@11
        echo 'export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt update && sudo apt install -y openjdk-11-jdk
    else
        print_error "Please install Java 11 manually"
        exit 1
    fi
fi

# Step 2: Check Android SDK
print_step "Checking Android SDK..."

if [ -z "$ANDROID_HOME" ]; then
    print_warning "ANDROID_HOME not set"
    
    # Check if Android Studio is installed
    if [[ "$OSTYPE" == "darwin"* ]] && [ -d "/Applications/Android Studio.app" ]; then
        export ANDROID_HOME="$HOME/Library/Android/sdk"
        print_success "Found Android Studio, setting ANDROID_HOME"
    elif [[ "$OSTYPE" == "linux-gnu"* ]] && [ -d "$HOME/Android/Sdk" ]; then
        export ANDROID_HOME="$HOME/Android/Sdk"
        print_success "Found Android SDK, setting ANDROID_HOME"
    else
        print_warning "Android SDK not found. Would you like to install it? (y/n)"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            ./scripts/install-android-sdk.sh
        else
            print_error "Android SDK required. Please install Android Studio or SDK tools"
            exit 1
        fi
    fi
else
    print_success "ANDROID_HOME found: $ANDROID_HOME"
fi

# Step 3: Install dependencies
print_step "Installing project dependencies..."
npm install
print_success "Dependencies installed"

# Step 4: Setup Android project
print_step "Setting up Android project..."

# Create directories
mkdir -p android/app/src/main/java/com/finergycloud/app
mkdir -p android/app/src/main/res/{layout,values,drawable}

# Make gradlew executable
chmod +x android/gradlew

print_success "Android project setup complete"

# Step 5: Test build
print_step "Testing build..."
cd android
./gradlew clean
./gradlew assembleDebug
cd ..

if [ -f "android/app/build/outputs/apk/debug/app-debug.apk" ]; then
    print_success "Build test successful!"
else
    print_error "Build test failed"
    exit 1
fi

# Step 6: Create quick commands
print_step "Creating quick commands..."

cat > quick-commands.sh << 'EOF'
#!/bin/bash
# Quick commands for FinergyCloud development

case "$1" in
    "dev")
        echo "Starting development server..."
        npm start
        ;;
    "android")
        echo "Running on Android..."
        npm run android
        ;;
    "build")
        echo "Building release..."
        ./scripts/build-android.sh
        ;;
    "install")
        echo "Installing on device..."
        adb install android/app/build/outputs/apk/debug/app-debug.apk
        ;;
    *)
        echo "Available commands:"
        echo "  ./quick-commands.sh dev     - Start development server"
        echo "  ./quick-commands.sh android - Run on Android device"
        echo "  ./quick-commands.sh build   - Build release version"
        echo "  ./quick-commands.sh install - Install debug APK"
        ;;
esac
EOF

chmod +x quick-commands.sh

print_success "Quick commands created"

# Final summary
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
print_success "Your FinergyCloud Android development environment is ready!"
echo ""
echo "📱 Next steps:"
echo "   1. Connect an Android device or start an emulator"
echo "   2. Run: ./quick-commands.sh android"
echo "   3. For Play Store build: ./quick-commands.sh build"
echo ""
echo "🔧 Quick commands:"
echo "   ./quick-commands.sh dev     - Start development"
echo "   ./quick-commands.sh android - Run on device"
echo "   ./quick-commands.sh build   - Build for release"
echo ""
echo "📚 Documentation:"
echo "   - Setup guide: SETUP-GUIDE.md"
echo "   - Android guide: README-ANDROID.md"
echo "   - Play Store: play-store/release-checklist.md"