import {Injectable} from "angular2/core";
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
                console.log(imgUrls);
                return imgUrls;
            }, (err) => {                                   
                if(err.error == "cordova_not_available") {               
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");                                   
                } else {                
                    alert("Failed to open albums: " + err.error);
                }
            });
        },         
    }
    
    camera = {       
        open () : Promise<any>  {
            var options = {
                destinationType: 1,
                sourceType: 1,
                encodingType: 0,
                quality:100,
                allowEdit: false,
                saveToPhotoAlbum: true,            
                correctOrientation: true,
            };        
            return Camera.getPicture(options).then((imgUrl) => {
                console.log(imgUrl);
                return imgUrl;
            }, (err) => {                
                if(err.error == "cordova_not_available") {
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");            
                } else {
                    alert("Failed to open camera: " + err.error);                
                }    
            });
        } 
    }  
    
    file = {
        upload (url: string, image: string, onSuccess: any, onFailed: any, onProgress: any) : void {
            var ft = new FileTransfer();                       
            var options = new FileUploadOptions();
            var filename = _.uniqueId() + ".jpg";
            
            options.fileKey = "file";
            options.fileName = filename;
            options.mimeType = "image/jpeg"
            options.chunkedMode = false;
            options.headers = { 
                'Content-Type' : undefined
            }                 
             options.params = {
                fileName: filename
            };  
                   
            ft.onprogress =  (e: ProgressEvent) => onProgress(e);  
            ft.upload(image, url, onSuccess, onFailed, options);            
        }
    }  
}