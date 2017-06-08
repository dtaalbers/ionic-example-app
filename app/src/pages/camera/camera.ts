import { Component } from '@angular/core';
import { PluginService } from '../../services/PluginService';

@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html',
})
export class CameraPage {

    /**
     * The url of the taken image
     */
    public image: string;

    constructor(
        private plugin_service: PluginService
    ) { }

    /**
     * Opens the camera and display the taken picture if available
     */
    public async open_camera(): Promise<void> {
        this.image = await this.plugin_service.open_camera();
    }
}
