import { Component, Input } from '@angular/core';

@Component({
    selector: 'progress-bar',
    templateUrl: 'progress-bar.html'
})
/**
 * Credits to https://www.joshmorony.com/build-a-simple-progress-bar-component-in-ionic-2/
 * for the example 
 */
export class ProgressBarComponent { 
    /**
     * The amount of progress made
     */
    @Input('progress') public progress: number;
}