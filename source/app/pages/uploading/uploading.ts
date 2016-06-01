import {Page, NavController, NavParams, Alert} from 'ionic-angular';
import {Transfer} from 'ionic-native';
import {Plugins} from '../../services/plugins.service';
import {Home} from '../home/home';
import * as $ from 'jquery';
import * as _ from 'underscore';

@Page({
  templateUrl: 'build/pages/uploading/uploading.html',
})
export class UploadingPage {
    
    images: Array<string>
    
    finished: boolean = false;
    current: number = 1;
    total: number;
    
    constructor(private nav: NavController, 
                private navParams: NavParams,
                private plugins: Plugins) {  
                    
        this.images = this.navParams.get("images");        
        if(!this.images || this.images.length == 0) {
            let alert = Alert.create({
                title: "Error",
                subTitle: "No images found to upload",
                buttons: ['Ok']
            });
            nav.present(alert);
            return;
        }      
        
        this.total = this.images.length;   
        this.upload(this.images[0]);       
    }
    
    done = () : void => {
        this.nav.setRoot(Home);    
    }
    
    success = (result: any) : void => {            
        this.current++;         
        if(this.current <= this.total) {              
            this.setCurrent(this.current);   
            this.setProgress(0);            
            setTimeout(() : void => {     
                // give the animation time to reset           
                this.upload(this.images[this.current - 1]);
            },1000);
        } else {   
            this.finished = true;
            $("#done").show();
        }
    }
            
    failed = (err: any) : void => {
        var code = err.code;
        alert("Failed to upload image. Code: " + code);
    }
    
    onProgress =  (progressEvent: ProgressEvent) : void => {
        if (progressEvent.lengthComputable) {
            var progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            this.setProgress(progress);       
        }
    }
    
    setProgress = (progress: number) : void => {  
        var $circle = $('#svg #bar');
        if(progress < 0 ){
            progress = 0;
        }
        if(progress > 100) {
            progress = 100;
        }         
        let r = parseInt($circle.attr('r'));
        var c = Math.PI*(r*2);
        var pct = ((100-progress)/100)*c;            
        $circle.css({ strokeDashoffset: pct});            
        $('#cont').attr('data-pct',progress);              
    }
    
    setCurrent = (current: number) : void => {
        $("#current").html(current.toString());
    }
    
    upload = (image: string) : void => { 
        let ft = new Transfer();
        let filename = _.uniqueId() + ".jpg";
        let options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type' : undefined
            },
            params: {
                fileName: filename
            }
        }; 
        ft.onProgress(this.onProgress);
        ft.upload(image, "http://services.dtaalbers.com/staging/pictures", options, false)
        .then((result: any) => {
            this.success(result);
        }).catch((error: any) => {
            this.failed(error);
        }); 
    }
}
