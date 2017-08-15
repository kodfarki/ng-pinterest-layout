import {
  Component, OnInit, Input, AfterViewInit, AfterContentInit, AfterContentChecked,
  AfterViewChecked, ViewChild
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
  index: number = 0;
  loadedPostsIndex: number = 0;

  constructor(public ap: AppComponent) {
    document.scrollingElement.scrollTop;
  }

  ngOnInit() {
  }

  public positionElementsReady() {

    this.loadedPostsIndex++;
     //console.log("Resim :" + this.loadedPostsIndex);
    if (this.loadedPostsIndex == this.imageArray.length) {
      console.log("Resimler yüklendi düzenleniyor..");
      this.positionElements(false);
    }
  }

  public positionElement(post)
  {
    let value = "width: 50%; position: absolute; top: " + this.top + "px; left: " + this.left + "px";
    post.setAttribute("style", value);

    let positionInfo = post.getBoundingClientRect();

    if (this.currentColumn == 0) {
      //console.log("solda");
      this.leftColumnHeight += Math.abs(positionInfo.height)

      if (this.rightColumnHeight < this.leftColumnHeight) {
        this.currentColumn = 1;
        this.left = positionInfo.right;
        this.top = this.rightColumnHeight;
      } else {
        this.currentColumn = 0;
        this.left = 0;
        this.top = this.leftColumnHeight;
      }
    }
    else if (this.currentColumn == 1) {
      //console.log("sağda")
      this.rightColumnHeight += Math.abs(positionInfo.height)

      if (this.rightColumnHeight < this.leftColumnHeight) {
        this.currentColumn = 1;
        this.top = this.rightColumnHeight;
      } else {
        this.currentColumn = 0;
        this.left = 0;
        this.top = this.leftColumnHeight;
      }
    }
  }
  public positionElements(isResized: boolean): void {



    let cards = document.getElementsByClassName("dCard");
    if (isResized) {
      console.log("Ekran döndürüldü düzenleniyor..")
      this.reset();
    }
    while (this.index < this.imageArray.length) {
      let card = Array.from(cards)[this.index];
       // console.log("Column: " + this.currentColumn + ", post: " + this.index);

      let value = "width: 50%; position: absolute; top: " + this.top + "px; left: " + this.left + "px";
      card.setAttribute("style", value);

      let positionInfo = card.getBoundingClientRect();

    //  let refresherHeight = document.getElementById("refresher").offsetHeight;
      //console.log("[positionInfo] top:" + positionInfo.top + ", left: " + positionInfo.left + ", bottom: " + positionInfo.bottom + ", right: " + positionInfo.right + ", positionInfo.height: " + positionInfo.height);

      if (this.currentColumn == 0) {
        //console.log("solda");
        this.leftColumnHeight = Math.abs(positionInfo.bottom)/* - refresherHeight*/;

        if (this.rightColumnHeight < this.leftColumnHeight) {
          this.currentColumn = 1;
          this.left = positionInfo.right;
          this.top = this.rightColumnHeight;
        } else {
          this.currentColumn = 0;
          this.left = 0;
          this.top = this.leftColumnHeight;
        }
      }
      else if (this.currentColumn == 1) {
        //console.log("sağda")
        this.rightColumnHeight = Math.abs(positionInfo.bottom)/* - refresherHeight*/;

        if (this.rightColumnHeight < this.leftColumnHeight) {
          this.currentColumn = 1;
          this.top = this.rightColumnHeight;
        } else {
          this.currentColumn = 0;
          this.left = 0;
          this.top = this.leftColumnHeight;
        }
      }
      this.index++;
    }

    /*if (this.isloading) {
      this.content.scrollTo(0, this.scrollY, 0);
      this.infiniteScroll.complete();
      this.isloading = false;
      this.loading.dismiss();
    }*/

  }

  private reset() {
    this.top = 0;
    this.left = 0;
    this.leftColumnHeight = 0;
    this.rightColumnHeight = 0;
    this.currentColumn = 0;
    this.index = 0;
    //this.content.scrollToTop(0);
  }
}
