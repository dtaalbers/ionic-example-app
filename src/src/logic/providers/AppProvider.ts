import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

export class AppProvider {

    /**
     * Decide whether to use the mocks or the real plugins
     */
    public static get_providers() {
        let providers;
        // Here we check if we are using the app in the browser (for development) or
        // if we are using the app on a devices
        // Example is from https://www.joshmorony.com/automating-mocks-in-ionic-native-3-x/
        if (document.URL.includes('https://') || document.URL.includes('http://')) {
            // The http or https protocol is used. So we can savely say that we're working
            // in the browser. Use the mocks that will mock the cordova plugins
            providers = [
                StatusBar,
                SplashScreen,
                InAppBrowser,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ];
        } else {
            // We are now working the app on a device. We can use the cordova 
            // pluings. Yeah!
            providers = [
                StatusBar,
                SplashScreen,
                InAppBrowser,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ];
        }
        return providers;
    }
}