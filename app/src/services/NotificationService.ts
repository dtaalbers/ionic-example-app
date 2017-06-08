import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NotificationService {

    /**
     * The amount of time to show a toast (in milliseconds)
     */
    private time_show_time: number = 3000;
    /**
     * The position of the toast
     */
    private toast_position: string = 'bottom';
    /**
     * The close toast button text
     */
    private toast_close_text: string = 'Close';
    /**
     * A flag that decides whether to show the toast close button
     */
    private show_toast_close_button: boolean = true;

    constructor(
        private toast_controller: ToastController
    ) { }

    /**
     * Notifies the user that an error has occurred
     * @param message The error that occurred
     */
    public notify_error(error: any, details?: string): void {
        console.log(error, details);
        let toast = this.toast_controller.create({
            message: 'Something went wrong. Try again later',
            duration: this.time_show_time,
            position: this.toast_position,
            showCloseButton: this.show_toast_close_button,
            closeButtonText: this.toast_close_text,
            cssClass: 'toast-danger'
        });
        toast.present();
    }
    
    /**
     * Notifies the user with a custom message in info styles
     * @param message The message for the user
     */
    public notify_info(message: string): void {
        let toast = this.toast_controller.create({
            message: message,
            duration: this.time_show_time,
            position: this.toast_position,
            showCloseButton: this.show_toast_close_button,
            closeButtonText: this.toast_close_text,
            cssClass: 'toast-info'
        });
        toast.present();
    }

    /**
     * Notifies the user with a custom message in warning styles
     * @param message The message for the user
     */
    public notify_warning(message: string): void {
        let toast = this.toast_controller.create({
            message: message,
            duration: this.time_show_time,
            position: this.toast_position,
            showCloseButton: this.show_toast_close_button,
            closeButtonText: this.toast_close_text,
            cssClass: 'toast-warning'
        });
        toast.present();
    }

    /**
     * Notifies the user with a custom message in success styles
     * @param message The message for the user
     */
    public notify_success(message: string): void {
        let toast = this.toast_controller.create({
            message: message,
            duration: this.time_show_time,
            position: this.toast_position,
            showCloseButton: this.show_toast_close_button,
            closeButtonText: this.toast_close_text,
            cssClass: 'toast-success'
        });
        toast.present();
    }
}