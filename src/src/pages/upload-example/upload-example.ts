import { Component, NgZone } from '@angular/core';
import { PluginService } from '../../services/PluginService';
import { Insomnia } from '@ionic-native/insomnia';
import { NotificationService } from '../../services/NotificationService';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { AppConfiguration } from '../../application/AppConfiguration';

@Component({
    selector: 'upload-example',
    templateUrl: 'upload-example.html'
})
export class UploadExamplePage {
    /**
     * The urls of the selected images
     */
    public images: Array<string> = [];
    /**
     * A flag that indicates whether the app is uploading files or not
     */
    public is_uploading: boolean = false;
    /**
     * The index of the current image being uploaded
     */
    public current: number = 0;
    /**
     * Total images to upload
     */
    public total: number;
    /**
     * Amount of progress made during an image upload
     */
    public progress: number = 20;
    /**
     * The transfer object
     */
    private file_transfer: TransferObject = this.transfer.create();

    constructor(
        private plugin_service: PluginService,
        private ng_zone: NgZone,
        private insomnia: Insomnia,
        private notification_service: NotificationService,
        private transfer: Transfer
    ) { }

    /**
     * Opens the albums and displays the selected images if available
     */
    public async open_albums(): Promise<void> {
        this.images = this.images.concat(await this.plugin_service.open_albums());
    }

    /**
     * Opens the camera and displays the picture if available
     */
    public async open_camera(): Promise<void> {
        this.images.push(await this.plugin_service.open_camera());
    }

    /**
     * Starts the upload of the 
     */
    public async start_upload(): Promise<void> {
        // Set upload metadata
        this.is_uploading = true;
        this.total = this.images.length;
        // Keep the phone awake (e.g. dont let go in sleep mode)
        this.insomnia.keepAwake()
        // Start the first upload
        this.upload();
    }

    /**
     * The on upload progress callback event
     * @param progressEvent The progress event of the image upload
     */
    public on_progress = (progressEvent: ProgressEvent): void => {
        this.ng_zone.run(() => {
            if (progressEvent.lengthComputable) {
                let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                if (progress > 100) progress = 100;
                if (progress < 0) progress = 0;
                this.progress = progress;
            }
        });
    }

    /**
     * Actually uploads an image
     */
    public async upload(): Promise<void> {
        // Bind the progress function
        this.file_transfer.onProgress(this.on_progress);
        // Start uploading!
        try {
            let result = await this.file_transfer.upload(
                encodeURI(this.images[this.current]),
                encodeURI(AppConfiguration.base_url + 'media/'),
                false
            );
            this.on_success(result);
        } catch (e) {
            this.on_failed(e);
        }
    }

    /**
     * The on success upload callback 
     * @param result The upload result
     */
    public on_success = (result: any): void => {
        // Do we have more to upload?
        if (this.current + 1 < this.images.length) {
            // Yes, we have. Up the current index 
            this.current++;
            // and start the upload
            this.upload();
        } else {
            // No, we're done with uploading. Allow the device to sleep again.
            // This is important, because if you don't allow sleep again
            // in any case, apple wont accept your app in the store.
            this.insomnia.allowSleepAgain();
        }
    }

    /**
     * The on failed upload callback
     * @param error The upload error
     */
    public on_failed = (error: any): void => {
        this.is_uploading = false;
        // Something went wrong, allow sleep again
        this.insomnia.allowSleepAgain();
        // These are cancel events, if user canceled don't do anything
        if (error.code == 3 || error.code == 4) return;
        // Notify the user that something went wrong.
        this.notification_service.notify_error(error);
    }
}

