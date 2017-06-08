import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CameraPage } from '../camera/camera';
import { ImagePickerPage } from '../image-picker/image-picker';
import { UploadExamplePage } from '../upload-example/upload-example';
import { AboutPage } from '../about/about';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    /**
     * The first tab will be the homepage
     */
    tab1Root = HomePage;
    /**
     * The second page is the camera example page
     */
    tab2Root = CameraPage;
    /**
     * The third page is the image picker example page
     */
    tab3Root = ImagePickerPage;
    /**
     * The fourth page is the upload example page
     */
    tab4Root = UploadExamplePage;
    /**
     * The fifth page is the about page
     */
    tab5Root = AboutPage;
}
