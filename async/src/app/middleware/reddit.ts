import {REQUEST_POSTS, RECEIVE_POSTS, INVALIDATE_REDDIT, SELECT_REDDIT, INIT} from '../reducers/reddit';
import {Observable} from 'rxjs/Observable';
import {Reddit} from '../services/reddit';


//surrounding func for deps
export const redditPreMiddleware = function (reddit:Reddit) {
    //return an Obs carrying the type/payload to pass to reducers
    return (o$:Observable<{type:string, payload:any}>)=> {
        return o$
            .mergeMap(({type, payload})=> {
                console.log(`Triggering middleware with ${type} and ${payload}`)
                switch (type) {
                    case REQUEST_POSTS:
                        return o$;
                    case INVALIDATE_REDDIT:
                        return o$;
                    case SELECT_REDDIT:
                        console.log(`case...`);
return o$
    .switchMap<{url:string, data:any}>(
        ({payload:url})=>reddit.fetchPosts(url),
        ({payload:url}, {data}):{url:string, data:any}=> ({url, data}))
    //grr, Webstorm complaining about destructuring
    .map((action)=> ({
        type: RECEIVE_POSTS,
        payload: {
            reddit: action.url,
            data: action.data
        }
    }))

                            ;
                    default:
                        return o$;
                }
            });
    };
};
