import {Injectable} from "@angular/core";
import {Camera, ImagePicker} from 'ionic-native';
import * as _ from 'underscore';

@Injectable()
export class Plugins {
    
    constructor() { }     
    
    albums = {            
        open () : Promise<any>  { 
            return ImagePicker.getPictures({
                    quality: 100,                        
                    maximumImagesCount: 15,
            }).then((imgUrls) => {
                return imgUrls;
            }, (err) => {                                   
                if(err.error == "cordova_not_available") {               
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");                                   
                } else {                
                    console.log("Failed to open albums: " + err.error);
                }
            });
        },         
    }
    
    camera = {       
        open () : Promise<any>  {
            let options = {
                destinationType: 1,
                sourceType: 1,
                encodingType: 0,
                quality:100,
                allowEdit: false,
                saveToPhotoAlbum: true,            
                correctOrientation: true,
            };        
            return Camera.getPicture(options).then((imgUrl) => {
                return imgUrl;
            }, (err) => {                
                if(err.error == "cordova_not_available") {
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");            
                } else {
                    console.log("Failed to open camera: " + err.error);                
                }    
            });
        } 
    }  
}