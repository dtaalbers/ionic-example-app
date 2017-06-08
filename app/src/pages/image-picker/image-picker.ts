import { Component } from '@angular/core';
import { PluginService } from '../../services/PluginService';

@Component({
    selector: 'page-image-picker',
    templateUrl: 'image-picker.html',
})
export class ImagePickerPage {

    /**
     * The urls of the selected images
     */
    public images: Array<string> = [];

    constructor(
        private plugin_service: PluginService
    ) { }

    /**
     * Opens the albums and displays the selected images if available
     */
    public async open_albums(): Promise<void> {
        this.images = this.images.concat(await this.plugin_service.open_albums());
    }
}
