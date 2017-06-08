import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppConfiguration } from '../../application/AppConfiguration';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(
        private in_app_browser: InAppBrowser
    ) { }

    /**
     * Opens the issues page of the app in github
     */
    public open_github_page(): void {
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

