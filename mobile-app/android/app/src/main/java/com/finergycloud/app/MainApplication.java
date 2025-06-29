package com.finergycloud.app;

import android.app.Application;
import android.content.Context;
import androidx.multidex.MultiDex;

public class MainApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        
        // Initialize any SDKs or libraries here
        initializeApp();
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    private void initializeApp() {
        // Initialize crash reporting, analytics, etc.
        // Example: Firebase, Crashlytics, etc.
    }
}