import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from 'ionic-angular';

@Injectable()
export class DialogService {

    constructor(
        private alert_controller: AlertController
    ) { }

    /**
     * Opens a modal to ask if the user is sure to delete
     * @param message The delete question
     * @param on_confirmed The on confirmed callback
     * @param on_cancel The on cancel callback
     */
    public confirm_delete(question: string, on_confirmed: Function, on_cancel?: Function): void {
        let alert = this.alert_controller.create({
            title: 'Warning',
            message: question,
            buttons: [
                {
                    text: 'Delete',
                    handler: typeof (on_confirmed) === 'function' ? on_confirmed : () => { }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: typeof (on_cancel) === 'function' ? on_cancel : () => { }
                }
            ]
        } as AlertOptions);
        alert.present();
    }

    /**
     * Opens a modal to ask if the user is sure of something
     * @param question The delete question
     * @param on_confirmed The on confirmed callback
     * @param on_cancel The on cancel callback
     */
    public confirm(question: string, on_confirmed: Function, on_cancel?: Function): void {
        let alert = this.alert_controller.create({
            title: 'Warning',
            message: question,
            buttons: [
                {
                    text: 'Continue',
                    handler: typeof (on_confirmed) === 'function' ? on_confirmed : () => { }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: typeof (on_cancel) === 'function' ? on_cancel : () => { }
                }
            ]
        } as AlertOptions);
        alert.present();
    }
}