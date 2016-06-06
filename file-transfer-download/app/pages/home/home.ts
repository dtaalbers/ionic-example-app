import {Page, NavController, Alert, Platform} from 'ionic-angular';
import {Transfer} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class Home {
    url: string;
    savedTo: string;
    showImage: boolean = false;
    constructor(private nav: NavController, private platform: Platform) { }
    
    download = () : void => {
        this.platform.ready().then(() => {
            if(!this.url || this.url == ""){
                this.alert("Error", "Please enter a URL to a picture that we are going to download");
                return;
            } 
            let pathToSaveTo = "";
            let filename = this.url.substring(this.url.lastIndexOf('/') + 1);
            if (this.platform.is('android')) {
                pathToSaveTo = cordova.file.dataDirectory + filename;
            }
            else if(this.platform.is('ios')) {
                pathToSaveTo = cordova.file.dataDirectory + filename;
            }
            let ft = new Transfer();
            ft.download(this.url, pathToSaveTo).then(() => {
                this.savedTo = pathToSaveTo;
                this.showImage = true;
            });
        });
    }
    
    alert = (title: string, message: string) : void => {
        let confirm = Alert.create({
            title: title,
            message: message,
            buttons: ['OK']
        });
        this.nav.present(confirm); 
    }
 }
