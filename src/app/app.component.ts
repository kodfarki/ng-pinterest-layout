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
    cardsHeight = ["100", "200", "300", "400"];
    posts: ImageData[];


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
                complete: () => console.log("")
            });
    }

    static $id(id) {
        return document.getElementById(id);
    }

    voidMethod() {
    }

}
