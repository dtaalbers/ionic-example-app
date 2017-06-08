import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

import { PluginService } from '../../services/PluginService';
import { NotificationService } from '../../services/NotificationService';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Insomnia } from '@ionic-native/insomnia';
import { Transfer } from '@ionic-native/transfer';
import { ImageResizer } from '@ionic-native/image-resizer';

import { CameraMock } from '../mocks/CameraMock';
import { ImagePickerMock } from '../mocks/ImagePickerMock';
import { ImageResizerMock } from '../mocks/ImageResizerMock';
import { DialogService } from '../../services/DialogService';

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
                Insomnia,
                Transfer,
                { provide: ImageResizer, useClass: ImageResizerMock },
                { provide: Camera, useClass: CameraMock },
                { provide: ImagePicker, useClass: ImagePickerMock },
                PluginService,
                NotificationService,
                DialogService,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
            ];
        } else {
            // We are now working the app on a device. We can use the cordova 
            // pluings. Yeah!
            providers = [
                StatusBar,
                SplashScreen,
                InAppBrowser,
                Insomnia,
                Transfer,
                ImageResizer,
                Camera,
                ImagePicker,
                PluginService,
                NotificationService,
                DialogService,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ];
        }
        return providers;
    }
}