import {Reducer, Action} from "@ngrx/store";

export interface RedditPosts {
    isFetching: boolean,
    didInvalidate?: boolean,
    posts: Array<any>,
    lastUpdated?: Date,
    selectedReddit?: string
}

export const INIT = 'INIT';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const SELECTED_REDDIT = 'SELECTED_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const selectedReddit : Reducer<string> = (state : string = 'Angular 2', action: Action) => {
    switch(action.type) {
        case SELECTED_REDDIT:
            console.log(action.type);
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};

const posts : Reducer<RedditPosts> = (state : RedditPosts = {
    isFetching: false,
    didInvalidate: false,
    posts: []
}, {type, payload}: Action) => {

    console.log(payload);

  switch(type) {
      case INVALIDATE_REDDIT:
          return Object.assign({}, state, {
              didInvalidate: true
          });
      case REQUEST_POSTS:
          return Object.assign({}, state, {
              isFetching: true,
              didInvalidate: false
          });
      case RECEIVE_POSTS:
          const s = Object.assign({}, state, {
              isFetching: false,
              didInvalidate: false,
              posts: payload.data.children.map(child => child.data),
              lastUpdated: Date.now()
          });

          console.log(`--------`);
          console.log(s);
          console.log(`--------`);

          return s;
      default:
          return state;
  }
};

export const postsByReddit : Reducer<RedditPosts> = (state: {} = {}, {type, payload} : Action) => {
    console.log(`
        postsByReddit
        ${type}
        ${payload}
        `);


    switch (type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [payload.reddit]: posts(state[payload.reddit], {type, payload})
            });
        default:
            return state;
    }
};

