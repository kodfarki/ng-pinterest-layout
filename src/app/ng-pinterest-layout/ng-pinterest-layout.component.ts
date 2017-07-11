import {Component, OnInit, Input, AfterViewInit, AfterContentInit} from '@angular/core';
import {ImageData} from "../image.model";
import {AppComponent} from "../app.component";

@Component({
    selector: 'ng-pinterest-layout',
    templateUrl: './ng-pinterest-layout.component.html',
    styleUrls: ['./ng-pinterest-layout.component.css']
})
export class NgPinterestLayout implements OnInit, AfterContentInit {

    @Input() imageArray: ImageData[];
    top = 0;
    left = 0;
    currentColumn: number = 0;
    leftColumnHeight = 0;
    rightColumnHeight = 0;
    postIndex = 0;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }

    ngAfterContentInit(): void {
        this.positionElements();
    }

    positionElements(): void {
        let container2 = AppComponent.$id("container");
        let posts = container2.getElementsByClassName("post");

        let postIndex = 0;
        this.reset();
        for (let post of Array.from(posts)) {
            postIndex++;
            console.log("Column: " + this.currentColumn + ", post: " + postIndex);

            if (this.currentColumn == 0) {
                let value = "position: absolute; top: " + this.top + "px; left: " + this.left + "px";
                post.setAttribute("style", value);
                console.log(value);

                let positionInfo = post.getBoundingClientRect();
                console.log("[positionInfo] top:" + positionInfo.top + ", left: " + positionInfo.left + ", bottom: " + positionInfo.bottom + ", right: " + positionInfo.right + ", positionInfo.height: " + positionInfo.height );

                this.leftColumnHeight = positionInfo.bottom;
                if (this.rightColumnHeight < this.leftColumnHeight) {
                    this.currentColumn = 1;
                    this.left = positionInfo.right;
                    this.top = this.rightColumnHeight;
                } else {
                    this.currentColumn = 0;
                    this.left = 0;
                    this.top = positionInfo.bottom;
                }
            } else if (this.currentColumn == 1) {
                let value = "position: absolute; top: " + this.top + "px; left: " + this.left + "px;";
                post.setAttribute("style", value);
                console.log(value);

                let positionInfo = post.getBoundingClientRect();
                console.log("[positionInfo] top:" + positionInfo.top + ", left: " + positionInfo.left + ", bottom: " + positionInfo.bottom + ", right: " + positionInfo.right + ", positionInfo.height: " + positionInfo.height );

                this.rightColumnHeight = positionInfo.bottom;
                if (this.rightColumnHeight < this.leftColumnHeight) {
                    this.currentColumn = 1;
                    this.top = positionInfo.bottom;
                } else {
                    this.currentColumn = 0;
                    this.left = 0;
                    this.top = this.leftColumnHeight;
                }
            }
        }
    }

    private reset() {
        this.top = 0;
        this.left = 0;
        this.leftColumnHeight = 0;
        this.rightColumnHeight = 0;
        this.currentColumn = 0;
    }
}
