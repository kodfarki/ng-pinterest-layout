import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Post} from './post.model';
import 'rxjs/add/operator/map';


@Injectable()
export class PostService {

    private url = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    constructor(private http: Http) {
    }

    getPosts() {
        return this.http.get(this.url)
            .map(res => res.json());
    }

}
