import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {PostService} from "../post-service/post-service";

import {NgPinterestLayout} from "./ng-pinterest-layout/ng-pinterest-layout.component"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]
})
export class AppComponent implements OnInit {
  title = 'app';
  cards = ["1", "2", "3", "4"];
  cardsWidht = ["400", "500", "600"];
  cardsHeight = ["150", "250", "350"];
  posts: ImageData[];
  postss = [];

  baseURL = "http://lorempixel.com";
  widht: number;
  height: number;

  constructor(private service: PostService) {

  }

  ngOnInit(): void {
    this.service.getPosts()
      .subscribe({
        next: (posts) => {
          this.posts = posts.data;
          let container2 = AppComponent.$id("container");
          // var config = {attributes: true, childList: true, characterData: true};
          // observer.observe(container2, config);
        },
        error: (err) => {
        },
        complete: () => {
          console.log("");
        }
      });
    for (let i = 0; i < 15; i++) {
      this.widht = Math.floor(Math.random() * 3);
      this.height = Math.floor(Math.random() * 3);
      this.postss[i] = this.baseURL + "/" + this.cardsWidht[this.widht] + "/" + this.cardsHeight[this.height];
    }

  }

  static $id(id) {
    return document.getElementById(id);
  }

  voidMethod() {
  }

}
