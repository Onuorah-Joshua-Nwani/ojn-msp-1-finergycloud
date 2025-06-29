# FinergyCloud Android App

This directory contains the Android version of the FinergyCloud mobile app, ready for Google Play Store deployment.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Java 11+
- Android SDK (API 24+)
- Android Studio (recommended)

### Setup
```bash
# Run the setup script
./scripts/setup-android.sh

# Or manual setup:
npm install
cd android && ./gradlew clean
```

### Development
```bash
# Start Metro bundler
npm start

# Run on Android device/emulator
npm run android

# Build debug APK
npm run build:android
```

## 📱 App Architecture

### WebView-Based Hybrid App
The Android app uses a WebView to display the FinergyCloud PWA, providing:
- **Native Performance**: Optimized WebView with hardware acceleration
- **Offline Support**: Service worker caching for offline functionality
- **Native Integration**: Android-specific features and optimizations
- **Easy Updates**: Content updates without app store approval

### Key Components

**MainActivity.java**
- Main WebView container
- Deep link handling
- Native Android integration

**WebView Configuration**
- JavaScript enabled
- Local storage support
- Responsive design optimization
- Security hardening

**Manifest Configuration**
- Required permissions
- Deep link support
- Notification handling
- Background services

## 🏪 Play Store Deployment

### Build Process
```bash
# Build release App Bundle (AAB)
./scripts/build-android.sh

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### Release Checklist
Follow the comprehensive checklist in `play-store/release-checklist.md`:

1. **Pre-Release**
   - [ ] App testing complete
   - [ ] Store assets prepared
   - [ ] Release keystore configured

2. **Play Console Setup**
   - [ ] Developer account created
   - [ ] App listing completed
   - [ ] Screenshots uploaded

3. **Compliance**
   - [ ] Privacy policy published
   - [ ] Content rating completed
   - [ ] Data safety section filled

### Store Listing Assets

**Required Assets:**
- App icon (512×512)
- Feature graphic (1024×500)
- Screenshots (minimum 2)
- App description
- Privacy policy

**Prepared Materials:**
- Store listing details: `play-store/listing-details.md`
- Asset specifications and guidelines
- ASO keyword optimization

## 🔧 Configuration

### App Signing
```bash
# Generate release keystore
keytool -genkey -v -keystore release.keystore \
  -alias release -keyalg RSA -keysize 2048 -validity 10000

# Add to gradle.properties:
MYAPP_UPLOAD_STORE_FILE=release.keystore
MYAPP_UPLOAD_KEY_ALIAS=release
MYAPP_UPLOAD_STORE_PASSWORD=***
MYAPP_UPLOAD_KEY_PASSWORD=***
```

### Build Variants
- **Debug**: Development and testing
- **Release**: Production Play Store builds

### Permissions
```xml
<!-- Required permissions -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.VIBRATE" />
```

## 📊 Features

### Core Functionality
- **Investment Analysis**: IRR simulation and risk assessment
- **Market Intelligence**: Real-time renewable energy market data
- **ESG Scoring**: Environmental, social, governance metrics
- **Portfolio Management**: Multi-project tracking and analytics
- **User Profiles**: Multiple demo user perspectives

### Android-Specific Features
- **Deep Links**: Direct navigation to specific app sections
- **Notifications**: Market alerts and updates
- **Offline Mode**: Cached data and functionality
- **Responsive Design**: Optimized for all Android screen sizes
- **Hardware Acceleration**: Smooth performance on all devices

### Progressive Web App Features
- **Service Worker**: Offline caching and background sync
- **App-like Experience**: Full-screen, native-feeling interface
- **Push Notifications**: Real-time market alerts
- **Install Prompt**: Add to home screen functionality

## 🧪 Testing

### Device Testing
```bash
# Install debug APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# View logs
adb logcat | grep FinergyCloud
```

### Testing Checklist
- [ ] Multiple Android versions (API 24+)
- [ ] Various screen sizes and densities
- [ ] Network connectivity scenarios
- [ ] Offline functionality
- [ ] Performance on low-end devices

### Automated Testing
```bash
# Run unit tests
npm test

# Run Android instrumentation tests
cd android && ./gradlew connectedAndroidTest
```

## 🔒 Security

### Data Protection
- **HTTPS Only**: All network communication encrypted
- **Local Storage**: Secure data storage with encryption
- **Input Validation**: Protection against injection attacks
- **Permission Minimization**: Only required permissions requested

### Privacy Compliance
- **GDPR Ready**: European privacy regulation compliance
- **Data Transparency**: Clear data usage disclosure
- **User Consent**: Explicit permission for data collection
- **Right to Deletion**: User data removal capabilities

## 📈 Analytics & Monitoring

### Performance Monitoring
- **Crash Reporting**: Automatic crash detection and reporting
- **Performance Metrics**: App startup time, memory usage
- **User Analytics**: Feature usage and user behavior
- **Network Monitoring**: API response times and errors

### Key Metrics
- App startup time
- WebView load performance
- User session duration
- Feature adoption rates
- Crash-free sessions

## 🚀 Deployment Pipeline

### Automated Build
```bash
# GitHub Actions workflow for automated builds
# See: .github/workflows/android-build.yml
```

### Release Process
1. **Development**: Feature development and testing
2. **Staging**: Internal testing and QA
3. **Release Candidate**: Final testing and approval
4. **Production**: Play Store release
5. **Monitoring**: Post-release monitoring and support

### Rollout Strategy
- **Staged Rollout**: Start with 5% of users
- **Monitoring**: Watch for crashes and negative feedback
- **Gradual Increase**: Expand to 25%, 50%, 100%
- **Rollback Plan**: Quick rollback if issues detected

## 📞 Support

### User Support
- **In-App Help**: Comprehensive help documentation
- **Email Support**: support@finergycloud.com
- **FAQ**: Common questions and troubleshooting
- **Video Tutorials**: Feature walkthrough videos

### Developer Support
- **Documentation**: Comprehensive technical documentation
- **Issue Tracking**: GitHub issues for bug reports
- **Community**: Developer community and forums
- **Professional Support**: Enterprise support options

## 🔄 Updates

### Update Strategy
- **Automatic Updates**: Play Store automatic updates
- **Feature Flags**: Gradual feature rollout
- **A/B Testing**: Feature testing with user segments
- **Backward Compatibility**: Support for older app versions

### Release Schedule
- **Bug Fixes**: As needed (hotfixes)
- **Minor Updates**: Monthly feature updates
- **Major Releases**: Quarterly major features
- **Security Updates**: Immediate security patches

## 📚 Resources

### Documentation
- [Android Developer Guide](https://developer.android.com/docs)
- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [React Native Android](https://reactnative.dev/docs/running-on-device)

### Tools
- [Android Studio](https://developer.android.com/studio)
- [Play Console](https://play.google.com/console)
- [Firebase Console](https://console.firebase.google.com)

### Community
- [FinergyCloud GitHub](https://github.com/finergycloud)
- [Android Developers](https://developer.android.com/community)
- [React Native Community](https://reactnative.dev/community/overview)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

For more information, see [CONTRIBUTING.md](../CONTRIBUTING.md).

---

**Built with ❤️ for sustainable investing**