import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Home} from './pages/home/home';
import {Type} from '@angular/core';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/,
})
export class MyApp {
    rootPage: Type = Home;;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
