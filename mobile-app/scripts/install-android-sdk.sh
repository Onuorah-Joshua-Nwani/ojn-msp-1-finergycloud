#!/bin/bash

# Android SDK Installation Script
# For systems without Android Studio

set -e

echo "📱 Installing Android SDK Command Line Tools"
echo "==========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Detect OS
OS="unknown"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
    SDK_URL="https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
    SDK_URL="https://dl.google.com/android/repository/commandlinetools-mac-9477386_latest.zip"
else
    print_error "Unsupported OS: $OSTYPE"
    exit 1
fi

print_status "Detected OS: $OS"

# Set Android SDK path
if [[ "$OS" == "macos" ]]; then
    ANDROID_HOME="$HOME/Library/Android/sdk"
else
    ANDROID_HOME="$HOME/Android/Sdk"
fi

print_status "Android SDK will be installed to: $ANDROID_HOME"

# Create SDK directory
mkdir -p "$ANDROID_HOME"
cd "$ANDROID_HOME"

# Download command line tools
print_status "Downloading Android SDK command line tools..."
curl -o cmdline-tools.zip "$SDK_URL"

# Extract tools
print_status "Extracting command line tools..."
unzip -q cmdline-tools.zip
mkdir -p cmdline-tools/latest
mv cmdline-tools/* cmdline-tools/latest/ 2>/dev/null || true
rm cmdline-tools.zip

# Set up environment
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"

# Accept licenses
print_status "Accepting Android SDK licenses..."
yes | sdkmanager --licenses

# Install essential SDK components
print_status "Installing essential SDK components..."
sdkmanager "platform-tools"
sdkmanager "platforms;android-34"
sdkmanager "build-tools;34.0.0"
sdkmanager "emulator"

# Add to shell profile
SHELL_PROFILE=""
if [[ "$SHELL" == *"zsh"* ]]; then
    SHELL_PROFILE="$HOME/.zshrc"
elif [[ "$SHELL" == *"bash"* ]]; then
    SHELL_PROFILE="$HOME/.bashrc"
fi

if [[ -n "$SHELL_PROFILE" ]]; then
    print_status "Adding environment variables to $SHELL_PROFILE"
    echo "" >> "$SHELL_PROFILE"
    echo "# Android SDK" >> "$SHELL_PROFILE"
    echo "export ANDROID_HOME=$ANDROID_HOME" >> "$SHELL_PROFILE"
    echo "export PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/latest/bin" >> "$SHELL_PROFILE"
    echo "export PATH=\$PATH:\$ANDROID_HOME/platform-tools" >> "$SHELL_PROFILE"
    echo "export PATH=\$PATH:\$ANDROID_HOME/emulator" >> "$SHELL_PROFILE"
fi

print_success "Android SDK installation completed!"
print_status "Please restart your terminal or run: source $SHELL_PROFILE"
print_status "Then verify installation with: adb --version"