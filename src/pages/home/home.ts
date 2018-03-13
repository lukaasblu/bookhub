import { Component, ViewChild } from '@angular/core';
import { trigger, state, animate, transition, keyframes, style } from '@angular/animations';
import { NavController, Slides } from 'ionic-angular';

import { MainPage } from '../main/main';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [

        trigger('colorFade', [

            transition('* => *', animate('700ms ease-out', keyframes([
                style({ opacity: 0.6}),
                style({ opacity: 0.8}),
                style({ opacity: 1}),
            ])))
        ]),

        trigger('smoothSwipe', [
            state('*', style({
                transform: 'translateX(0)'
            })),
            transition('* => rightSwipe', animate('700ms ease-out', keyframes([
                style({ transform: 'translateX(0)', offset: 0 }),
                style({ transform: 'translateX(-65px)', offset: 0.3 }),
                style({ transform: 'translateX(0)', offset: 1 })
            ]))),
            transition('* => leftSwipe', animate('700ms ease-out', keyframes([
                style({ transform: 'translateX(0)', offset: 0 }),
                style({ transform: 'translateX(65px)', offset: 0.3 }),
                style({ transform: 'translateX(0)', offset: 1 })
            ])))
        ])
    ]
})
export class HomePage {

    @ViewChild(Slides) slides: Slides;
    skipMsg: string = "Skip";

    state: string = 'x';

    slideColor: string = "#00C677";

    constructor(public navCtrl: NavController) {

    }

    skip() {
        this.navCtrl.push(MainPage);
    }

    slideChanged() {
        if (this.slides.isEnd())
            this.skipMsg = "Now, show me what you got !";
        else this.skipMsg = "Skip";

        this.slideColor = this.setSlideColor(this.slides.getActiveIndex());
    }

    slideMoved() {
        if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
            this.state = 'rightSwipe';
        else this.state = 'leftSwipe';
    }

    animationDone() {
        this.state = 'x';
    }

    setSlideColor(slideIndex: number) {
        console.log(slideIndex);

        let slideColor: string;
        switch(slideIndex) {
            case 0: slideColor = "#00C677"; break;
            case 1: slideColor = "#D1345B"; break;
            default: slideColor = "#F4E409"; break; // meaning the last slide and more.
        }

        return slideColor;
    }

}
