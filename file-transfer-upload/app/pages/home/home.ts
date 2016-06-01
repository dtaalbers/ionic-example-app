import {Page, NavController} from 'ionic-angular';
import {Plugins} from '../../services/plugins.service';
import {UploadingPage} from '../uploading/uploading';

@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class Home {
    images: Array<string> = [];

    constructor(private plugins: Plugins,
                private nav: NavController) { }

    openAlbums = () : void => {
        this.plugins.albums.open().then((imgUrls) => {            
            imgUrls.forEach((imageUrl: string) : void => {
                if(imageUrl){                  
                  this.images.push(imageUrl);
                }
            }); 
        });        
    }
      
    openCamera = () : void => { 
        this.plugins.camera.open().then((imageUrl) => { 
          if(imageUrl) {
            this.images.push(imageUrl);            
          }
      });
    }
    
    startUploading = () : void => {
      this.nav.setRoot(UploadingPage, {
          images: this.images
      });    
    }
 }
