import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppConfiguration } from '../../application/AppConfiguration';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    /**
     * The version of the app
     */
    public app_version: string = AppConfiguration.app_version;

    constructor(
        private in_app_browser: InAppBrowser
    ) { }

    /**
     * Opens the issues page of the app in github
     */
    public open_github_page(): void {
        // Note that I added '_blank' as extra parameter. This is because when you don't add
        // the page won't be opened in the in app browser on ios devices. It will use the 
        // default browser on the device instead. Apple does not like that as it makes
        // you leave the app
        let iab = this.in_app_browser.create(AppConfiguration.app_issues_github_page, '_blank');
        iab.show();
    }
    
    /**
     * Opens the developer site
     */
    public open_developer_site(): void {
        let iab = this.in_app_browser.create(AppConfiguration.developer_site, '_blank');
        iab.show();
    }
}

