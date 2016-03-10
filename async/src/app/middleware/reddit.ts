import {RECEIVE_POSTS, SELECT_REDDIT, SELECTED_REDDIT, LOADING} from '../reducers/reddit';
import {Observable} from 'rxjs/Observable';
import {Reddit} from '../services/reddit';

export const redditPreMiddleware = function (reddit:Reddit) {
    //return an Obs carrying the type/payload to pass to reducers
    return (o$:Observable<{type:string, payload:any}>)=> {
        return o$
            .mergeMap(({type, payload})=> {
                switch (type) {
                    case SELECT_REDDIT:
                        return Observable.concat(
                            //isFetching true
                            Observable.of({type: LOADING}),

                            //wait 2 seconds
                            Observable.timer(2000),

                            //request posts
                            reddit.fetchPosts(payload)
                                .map((body)=>({
                                    type: RECEIVE_POSTS,
                                    payload: {reddit: payload, data: body.data}
                                })),

                            //isFetching false, change selected item
                            Observable.of({type: SELECTED_REDDIT, payload})
                        );

                    default:
                        return o$;
                }
            });
    };
};
