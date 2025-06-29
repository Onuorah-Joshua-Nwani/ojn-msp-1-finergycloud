# 🔧 Android Development Environment Setup

## Step-by-Step Setup Guide

### 1. Install Required Software

#### **Java Development Kit (JDK)**
```bash
# For macOS (using Homebrew)
brew install openjdk@11
echo 'export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc

# For Ubuntu/Debian
sudo apt update
sudo apt install openjdk-11-jdk

# For Windows
# Download from: https://adoptium.net/temurin/releases/
```

#### **Node.js (if not already installed)**
```bash
# Download from: https://nodejs.org/
# Or using package managers:

# macOS
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Download installer from nodejs.org
```

#### **Android Studio**
1. Download from: https://developer.android.com/studio
2. Install Android Studio
3. During setup, install:
   - Android SDK
   - Android SDK Platform-Tools
   - Android Virtual Device (AVD)

### 2. Configure Environment Variables

#### **Set ANDROID_HOME**
```bash
# For macOS/Linux - Add to ~/.zshrc or ~/.bashrc
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin

# For Windows - Add to System Environment Variables
ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
Path=%Path%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator
```

#### **Reload Environment**
```bash
# macOS/Linux
source ~/.zshrc  # or ~/.bashrc

# Windows
# Restart Command Prompt or PowerShell
```

### 3. Verify Installation

```bash
# Check Java
java -version

# Check Node.js
node --version
npm --version

# Check Android SDK
adb --version
```

### 4. Run Setup Script

```bash
# Navigate to mobile-app directory
cd mobile-app

# Make script executable (macOS/Linux)
chmod +x scripts/setup-android.sh

# Run setup script
./scripts/setup-android.sh
```

### 5. Alternative Manual Setup

If the script doesn't work, follow these manual steps:

```bash
# Install dependencies
npm install

# Create Android directories
mkdir -p android/app/src/main/java/com/finergycloud/app
mkdir -p android/app/src/main/res/{layout,values,drawable}

# Make Gradle wrapper executable
chmod +x android/gradlew

# Install Android SDK components
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

## 🚀 Building the App

### Development Build
```bash
# Start Metro bundler
npm start

# In another terminal, run Android app
npm run android
```

### Production Build
```bash
# Build release App Bundle for Play Store
./scripts/build-android.sh

# Or manually:
cd android
./gradlew bundleRelease
```

## 📱 Testing on Device

### Enable Developer Options
1. Go to **Settings > About Phone**
2. Tap **Build Number** 7 times
3. Go back to **Settings > Developer Options**
4. Enable **USB Debugging**

### Install Debug APK
```bash
# Connect device via USB
adb devices

# Install app
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## 🏪 Play Store Submission

### 1. Create Release Keystore
```bash
keytool -genkey -v -keystore android/app/release.keystore \
  -alias release -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Configure Signing
Add to `android/gradle.properties`:
```properties
MYAPP_UPLOAD_STORE_FILE=release.keystore
MYAPP_UPLOAD_KEY_ALIAS=release
MYAPP_UPLOAD_STORE_PASSWORD=your_password
MYAPP_UPLOAD_KEY_PASSWORD=your_password
```

### 3. Build Release AAB
```bash
cd android
./gradlew bundleRelease
```

### 4. Google Play Console Setup
1. Create Google Play Developer account ($25 fee)
2. Go to: https://play.google.com/console
3. Create new app
4. Upload AAB file: `android/app/build/outputs/bundle/release/app-release.aab`
5. Complete store listing using provided templates
6. Submit for review

## 🔧 Troubleshooting

### Common Issues

**"ANDROID_HOME not set"**
```bash
# Add to your shell profile
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
```

**"Java not found"**
```bash
# Install Java 11
brew install openjdk@11  # macOS
sudo apt install openjdk-11-jdk  # Ubuntu
```

**"Gradle build failed"**
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleDebug
```

**"Device not detected"**
```bash
# Check USB debugging is enabled
adb devices

# Restart ADB if needed
adb kill-server
adb start-server
```

### Getting Help

- **Setup Issues**: Check `android-setup-complete.txt` after running setup
- **Build Issues**: Review `build-info.txt` after building
- **Play Store**: Follow `play-store/release-checklist.md`

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the generated log files
3. Consult the Android documentation
4. Contact support: support@finergycloud.com

---

**Next Steps**: Once setup is complete, run `./scripts/build-android.sh` to build your app for Play Store submission!