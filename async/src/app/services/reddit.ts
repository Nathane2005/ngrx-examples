import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Reddit{
    constructor(private http : Http){}

    fetchPosts(reddit : string):Observable<any>{
        return this.http
            .get(`https://www.reddit.com/r/${reddit.replace(' ', '')}.json`)
            .map(response => response.json());
    }
}