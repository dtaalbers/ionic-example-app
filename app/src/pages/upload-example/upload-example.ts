import { Component, NgZone } from '@angular/core';
import { PluginService } from '../../services/PluginService';
import { Insomnia } from '@ionic-native/insomnia';
import { NotificationService } from '../../services/NotificationService';
import { Transfer, TransferObject, FileUploadResult } from '@ionic-native/transfer';
import { AppConfiguration } from '../../application/AppConfiguration';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';
import { UploadImage } from '../../models/UploadImage';
import { Helper } from "../../application/Helper";
import { DialogService } from '../../services/DialogService';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'upload-example',
    templateUrl: 'upload-example.html'
})
export class UploadExamplePage {
    /**
     * The selected images
     */
    public images: Array<UploadImage> = [];
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
    public progress: number = 0;
    /**
     * The transfer object
     */
    private file_transfer: TransferObject = this.transfer.create();
    /**
     * A collection of upload responses
     */
    public upload_responses: any = [];

    constructor(
        private plugin_service: PluginService,
        private ng_zone: NgZone,
        private insomnia: Insomnia,
        private notification_service: NotificationService,
        private transfer: Transfer,
        private image_resizer: ImageResizer,
        private dialog_service: DialogService
    ) { }

    /**
     * Opens the albums and displays the selected images if available
     */
    public async open_albums(): Promise<void> {
        let originals = await this.plugin_service.open_albums();
        // Map the originals to an array of UploadImage
        let requests = await originals.map(async x => new UploadImage({
            path: x,
            guid: Helper.guid(),
            thumb: await this.resize(x)
        }));
        let images = await Promise.all(requests);
        // Save the originals
        this.images = this.images.concat(images);
    }

    /**
     * Opens the camera and displays the picture if available
     */
    public async open_camera(): Promise<void> {
        let orignal = await this.plugin_service.open_camera();
        this.images.push(new UploadImage({
            path: orignal,
            guid: Helper.guid(),
            thumb: await this.resize(orignal)
        }));
    }

    /**
     * Resizes an image
     * @param original The path to the original image
     */
    private async resize(original: string): Promise<string> {
        let options = {
            uri: original,
            folderName: 'Protonet',
            quality: 90,
            width: 1280,
            height: 1280
        } as ImageResizerOptions;
        return this.image_resizer.resize(options);
    }

    /**
     * Deletes a image
     * @param image The images to dlete
     */
    private delete(image: UploadImage): void {
        this.dialog_service.confirm_delete('Are you sure you want to delete this image?', confirmed => {
            if (confirmed) this.images = this.images.filter(x => x.guid != image.guid);
        });
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
        // Prepare our upload options
        let options = {
            fileKey: 'file',
            fileName: this.images[this.current].path.split('/').pop(),
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type': undefined
            },
            params: {}
        };
        try {
            // Start uploading!
            let result = await this.file_transfer.upload(
                encodeURI(this.images[this.current].path),
                encodeURI(AppConfiguration.base_url + 'media/'),
                options,
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
    public on_success = (result: FileUploadResult): void => {
        // Mark the image as uploaded 
        this.images[this.current].uploaded = true;
        // Do we have more to upload?
        if (this.current + 1 < this.images.length) {
            // Yes, we have. Up the current index 
            this.current++;
            // reset the progress
            this.progress = 0;
            // and start the upload
            this.upload();
        } else {
            // No, we're done with uploading. Allow the device to sleep again.
            // This is important, because if you don't allow sleep again
            // in any case, apple wont accept your app in the store.
            this.insomnia.allowSleepAgain();
            this.is_uploading = false;
            this.images = [];
            this.current = 0;
            this.notification_service.notify_success('Succesfully uploaded your images');
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

