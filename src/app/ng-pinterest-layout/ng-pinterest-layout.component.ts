import {
  Component, OnInit, Input, AfterViewInit, AfterContentInit, AfterContentChecked,
  AfterViewChecked
} from '@angular/core';
import {ImageData} from "../image.model";
import {AppComponent} from "../app.component";

@Component({
  selector: 'ng-pinterest-layout',
  templateUrl: './ng-pinterest-layout.component.html',
  styleUrls: ['./ng-pinterest-layout.component.css']
})
export class NgPinterestLayout implements OnInit {

  @Input() imageArray: ImageData[];
  top = 0;
  left = 0;
  currentColumn: number = 0;
  leftColumnHeight = 0;
  rightColumnHeight = 0;
  postIndex = 0;

  constructor(public ap: AppComponent) {
  }

  ngOnInit() {
  }

  public positionElementsCheck(): void {
    var postslength = AppComponent.$id("container").getElementsByClassName("post").length;

    if (this.postIndex == postslength - 1) {
      console.log("halo");
      //this.positionElements();
      this.positionElements();
    }
    this.postIndex++;
  }

  public positionElements(): void {
    let container2 = AppComponent.$id("container");
    let posts = container2.getElementsByClassName("post");

    this.reset();
    for (var post of Array.from(posts)) {

      // console.log("Column: " + this.currentColumn + ", post: " + postIndex);
      if (this.currentColumn == 0) {
        let value = "position: absolute; top: " + this.top + "px; left: " + this.left + "px";
        post.setAttribute("style", value);

        let positionInfo = post.getBoundingClientRect();
        this.negativeCheck(post.getBoundingClientRect());
        //console.log("[positionInfo] top:" + positionInfo.top + ", left: " + positionInfo.left + ", bottom: " + positionInfo.bottom + ", right: " + positionInfo.right + ", positionInfo.height: " + positionInfo.height);

        this.leftColumnHeight =  Math.abs(positionInfo.bottom);
        if (this.rightColumnHeight < this.leftColumnHeight) {
          this.currentColumn = 1;
          this.left = positionInfo.right;
          this.top = this.rightColumnHeight;
        } else {
          this.currentColumn = 0;
          this.left = 0;
          this.top = Math.abs(positionInfo.bottom);
        }
      } else if (this.currentColumn == 1) {
        let value = "position: absolute; top: " + this.top + "px; left: " + this.left + "px;";
        post.setAttribute("style", value);
        //console.log(value);

        let positionInfo = post.getBoundingClientRect();
        // console.log("[positionInfo] top:" + positionInfo.top + ", left: " + positionInfo.left + ", bottom: " + positionInfo.bottom + ", right: " + positionInfo.right + ", positionInfo.height: " + positionInfo.height);

        this.rightColumnHeight = Math.abs(positionInfo.bottom);
        if (this.rightColumnHeight < this.leftColumnHeight) {
          this.currentColumn = 1;
          this.top = Math.abs(positionInfo.bottom);
        } else {
          this.currentColumn = 0;
          this.left = 0;
          this.top = this.leftColumnHeight;
        }
      }
    }
  }

  private negativeCheck(positionInfo) {
    if (positionInfo.top < 0 || positionInfo.left < 0 || positionInfo.height < 0 || positionInfo.width < 0 || positionInfo.right < 0 || positionInfo.bottom < 0) {
      console.log("t :" + positionInfo.top);
      console.log("top :"+ this.top);
      console.log("left :" + this.left);
      console.log("b :" + positionInfo.bottom);
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
