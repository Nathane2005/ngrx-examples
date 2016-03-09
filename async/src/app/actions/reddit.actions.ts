import {Injectable} from 'angular2/core';
import {Store} from '@ngrx/store';
import {INVALIDATE_REDDIT, SELECT_REDDIT, INIT} from '../reducers/reddit';


@Injectable()
export class RedditActions{
    constructor(private _store : Store<any>){}

    selectReddit(reddit: string){
        this._store.dispatch({type: SELECT_REDDIT, payload: reddit});
    }

    invalidateReddit(reddit : string){
        // this._store.dispatch({type: INVALIDATE_REDDIT, payload: {reddit} });
        // this.selectReddit(reddit);
    }

    private shouldFetchPosts(postsByReddit, reddit){
        const posts = postsByReddit[reddit];
        if (!posts) {
            return true;
        }
        if (posts.isFetching) {
            return false;
        }
        return posts.didInvalidate;
    }

    init() {
        this._store.dispatch({type:INIT})
    }
}