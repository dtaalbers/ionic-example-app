import { Component } from '@angular/core';
import { HomePage } from '../home/home';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    /**
     * The first tab will be the homepage
     */
    tab1Root = HomePage;
}
