import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AppProvider } from '../application/providers/AppProvider';
import { AboutPage } from '../pages/about/about';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CameraPage } from '../pages/camera/camera';
import { ImagePickerPage } from '../pages/image-picker/image-picker';
import { UploadExamplePage } from '../pages/upload-example/upload-example';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        CameraPage,
        ImagePickerPage,
        UploadExamplePage,
        AboutPage,
        ProgressBarComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        CameraPage,
        ImagePickerPage,
        UploadExamplePage,
        AboutPage
    ],
    // We are using the custom written prodvider
    // here instead of the array that is normally
    // added here
    providers: AppProvider.get_providers()
})
export class AppModule { }
