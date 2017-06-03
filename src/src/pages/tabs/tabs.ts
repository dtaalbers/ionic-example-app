import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CameraPage } from '../camera/camera';

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
}
